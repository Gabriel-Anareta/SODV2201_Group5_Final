import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBook = ({ bookId }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: null,
    });

    useEffect(() => {
        // Fetch the existing book details
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
                const book = response.data;
                setFormData({
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    publicationDate: book.publicationDate,
                    coverImage: null, // Cover image won't be fetched; only updated if provided
                });
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, coverImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("author", formData.author);
        data.append("description", formData.description);
        data.append("publicationDate", formData.publicationDate);
        if (formData.coverImage) {
            data.append("coverImage", formData.coverImage);
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/books/${bookId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Book updated successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error updating the book:", error);
            alert("Failed to update the book.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Book</h2>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Author:
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Publication Date:
                <input
                    type="date"
                    name="publicationDate"
                    value={formData.publicationDate}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Cover Image:
                <input type="file" name="coverImage" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit">Update Book</button>
            <button
                type="button"
                onClick={() =>
                    setFormData({
                        title: "",
                        author: "",
                        description: "",
                        publicationDate: "",
                        coverImage: null,
                    })
                }
            >
                Cancel
            </button>
        </form>
    );
};

export default EditBook;