import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

registerBlockType('custom/testimonial', {
    title: 'Testimonials',
    icon: 'format-quote',
    category: 'common',
    attributes: {
        testimonials: {
            type: 'array',
            default: []
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const { testimonials } = attributes;

        // Function to update individual testimonial
        const updateTestimonial = (index, key, value) => {
            const newTestimonials = [...testimonials];
            newTestimonials[index][key] = value;
            setAttributes({ testimonials: newTestimonials });
        };

        // Function to add a new testimonial
        const addTestimonial = () => {
            setAttributes({
                testimonials: [...testimonials, { content: '', author: '', image: '' }]
            });
        };

        // Function to remove a testimonial
        const removeTestimonial = (index) => {
            const newTestimonials = [...testimonials];
            newTestimonials.splice(index, 1);
            setAttributes({ testimonials: newTestimonials });
        };

        return (
            <div {...useBlockProps()}>
                <PanelBody title="Manage Testimonials">
                    {testimonials.map((testimonial, index) => (
                        <Fragment key={index}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => updateTestimonial(index, 'image', media.url)}
                                        allowedTypes={['image']}
                                        value={testimonial.image}
                                        render={({ open }) => (
                                            <Button onClick={open} isPrimary>
                                                {testimonial.image ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                                {testimonial.image && (
                                    <img src={testimonial.image} alt="Author" style={{ width: '80px', height: '80px', borderRadius: '50%', marginTop: '10px' }} />
                                )}

                                <RichText
                                    tagName="blockquote"
                                    value={testimonial.content}
                                    onChange={(value) => updateTestimonial(index, 'content', value)}
                                    placeholder="Enter testimonial..."
                                />

                                <RichText
                                    tagName="cite"
                                    value={testimonial.author}
                                    onChange={(value) => updateTestimonial(index, 'author', value)}
                                    placeholder="Author name..."
                                />

                                <Button isDestructive onClick={() => removeTestimonial(index)}>
                                    Remove Testimonial
                                </Button>
                            </div>
                        </Fragment>
                    ))}
                </PanelBody>

                <Button onClick={addTestimonial} isPrimary>
                    Add Testimonial
                </Button>
            </div>
        );
    },

    save: ({ attributes }) => {
        return (
            <div {...useBlockProps.save()} className="custom-testimonial-block">
                {attributes.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        {testimonial.image && <img src={testimonial.image} alt="Author" className="testimonial-image" />}
                        <blockquote>
                            <RichText.Content tagName="p" value={testimonial.content} />
                            <RichText.Content tagName="cite" value={testimonial.author} />
                        </blockquote>
                    </div>
                ))}
            </div>
        );
    }
});
