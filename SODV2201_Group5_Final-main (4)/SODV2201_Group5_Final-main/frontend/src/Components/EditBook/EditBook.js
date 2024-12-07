import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditBook = () => {
    const { id } = useParams(); // Retrieve the book ID from the URL
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: null,
    });

    // Fetch the existing book data on component mount
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:7000/api/books/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }
                const data = await response.json();
                setFormData({
                    title: data.title || "",
                    author: data.author || "",
                    description: data.description || "",
                    publicationDate: data.publicationDate || "",
                    coverImage: null, // Existing cover image won't be fetched
                });
            } catch (error) {
                console.error("Error fetching book data:", error);
                alert("Failed to fetch book data.");
            }
        };

        fetchBook();
    }, [id]);

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, coverImage: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = new FormData();
        updatedFormData.append("title", formData.title);
        updatedFormData.append("author", formData.author);
        updatedFormData.append("description", formData.description);
        updatedFormData.append("publicationDate", formData.publicationDate);
        if (formData.coverImage) {
            updatedFormData.append("coverImage", formData.coverImage);
        }

        try {
            const response = await fetch(`http://localhost:7000/api/books/${id}`, {
                method: "PUT",
                body: updatedFormData,
            });

            if (!response.ok) {
                throw new Error("Failed to update book");
            }

            const result = await response.json();
            alert("Book updated successfully!");
            console.log(result);
        } catch (error) {
            console.error("Error updating the book:", error);
            alert("Failed to update the book.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
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
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
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
                <label>
                    Cover Image:
                    <input
                        type="file"
                        name="coverImage"
                        onChange={handleFileChange}
                    />
                </label>
                <button type="submit" style={{ marginTop: "10px" }}>Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;