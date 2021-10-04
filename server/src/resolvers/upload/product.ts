import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { expressIsAuth } from "../../middleware/isAuth";
import { v4 } from "uuid";
import { Product } from "../../entities/Product";

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../../../images/product"),
        filename: async (_: any, _file: any, callback: any) => {
            const name = await v4();
            callback(null, name + ".jpg"); // e.g. jh34gh2v4y + .jpg
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("image")) {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/upload",
    expressIsAuth,
    upload.single("file"),
    async (req, res) => {
        await Product.update(
            { id: req.body.id },
            {
                imgUrl: `http://localhost:4000/images/product/${req.file?.filename}`,
            }
        );
        console.log(req.file);
        return res.json({ success: true });
    }
);

export default router;
