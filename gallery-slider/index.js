import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

registerBlockType('custom/gallery-slider', {
    title: 'Gallery Slider',
    icon: 'images-alt2',
    category: 'common',
    attributes: {
        images: { type: 'array', default: [], source: 'query', selector: 'div img', query: { url: { type: 'string', source: 'attribute', attribute: 'src' } } }
    },

    edit: ({ attributes, setAttributes }) => {
        const { images } = attributes;

        const onSelectImages = (newImages) => {
            setAttributes({ images: newImages.map(img => ({ url: img.url })) });
        };

        return (
            <div {...useBlockProps()}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={images.map(img => img.url)}
                        render={({ open }) => (
                            <Button onClick={open} isPrimary>Select Images</Button>
                        )}
                    />
                </MediaUploadCheck>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {images.map((img, index) => (
                        <img key={index} src={img.url} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    ))}
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        return (
            <div {...useBlockProps.save()} className="custom-gallery-slider">
                {attributes.images.map((img, index) => (
                    <img key={index} src={img.url} alt="" />
                ))}
            </div>
        );
    }
});
