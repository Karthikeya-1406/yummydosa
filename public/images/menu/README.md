# /public/images/menu/

`photos/<key>.jpg` holds one photo per dish, keyed by the `photo` field on each
item in `src/data/menu.ts`. Several variants of the same dish share a photo.
For example, Butter Masala Dosa uses `butter-dosa.jpg`.

These are real, freely licensed photos from Wikimedia Commons, resized to 800px wide.
Each one's author, licence and source page is listed in `src/data/menuPhotos.ts`.
The site shows those credits on `/photo-credits`, as the CC BY and CC BY-SA licences require.

## Replacing a photo with the restaurant's own

1. Save the new photo over `photos/<key>.jpg` as a JPEG about 800px wide.
2. In `src/data/menuPhotos.ts`, change that key's entry to `author: 'Yummy Dosa'` and
   `license: 'Own photo'`. The credits page doesn't list the restaurant's own photos.
