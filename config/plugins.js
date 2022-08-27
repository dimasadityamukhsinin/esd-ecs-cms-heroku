module.exports = ({ env }) => ({
  ckeditor: true,
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'preview-button': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::modul.modul',
          targetField: 'Slug',
        },
      ],
    },
  },
})
