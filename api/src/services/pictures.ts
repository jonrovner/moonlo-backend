
export async function getImageURL(encoded: string) {
    
    const cleanedEncoded = encoded.replace(/^data:image\/\w+;base64,/, "");

    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB}`;
    
    const formData = new FormData();
    formData.append("image", cleanedEncoded);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("Upload result:", result);
        return result.data.url;

    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
