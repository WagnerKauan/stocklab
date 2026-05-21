import type { OurFileRouter } from '@/app/api/uploadthing/core';

import { generateReactHelpers } from '@uploadthing/react';


//Aqui eu export o hook useUploadThing que vai ser usado no front para fazer o upload

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
