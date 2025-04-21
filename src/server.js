import app from "./app.js";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT} (Mode: ${process.env.NODE_ENV || 'development'})`);
});