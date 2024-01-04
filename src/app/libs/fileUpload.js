import toast from "react-hot-toast";


//file upload function
export const handleUpload = (e, callBackFn) => {
    const file = e.target.files?.[0];
    console.log("file==>", file);
    if (file) {
        const promise = new Promise((resolve, reject) => {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then((response) => {
                if (response.ok) {
                    response.json().then((link) => {
                        console.log("uploaded file link", link);
                        callBackFn(link);
                        resolve(link);
                    });
                } else {
                    reject();
                }
            });
        });

        toast.promise(promise, {
            loading: "Uploading...",
            success: <b>Image uploaded!</b>,
            error: <b>Could not upload.</b>,
        });
    }
};