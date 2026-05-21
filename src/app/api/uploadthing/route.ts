import { createRouteHandler }
from "uploadthing/next";

//Aqui estou importando o createRouteHandler do uploadthing para criar uma rota para o upload de imagens

import {
 ourFileRouter
}
from "./core";

export const {
 GET,
 POST
}
=
createRouteHandler({

 router:
 ourFileRouter

});