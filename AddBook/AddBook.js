import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: null,
    });

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
            const response = await axios.post("http://localhost:3000/api/books", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Book added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding the book:", error);
            alert("Failed to add the book.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
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
            <button type="submit">Add Book</button>
            <button type="button" onClick={() => setFormData({
                title: "",
                author: "",
                description: "",
                publicationDate: "",
                coverImage: null,
            })}>Cancel</button>
        </form>
    );
};

export default AddBook;