import React, { useState } from "react";

const AddBook = () => {
    // State for form data
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("publicationDate", publicationDate);
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        try {
            const response = await fetch("http://localhost:7000/api/books", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Book added successfully!");
                console.log(data);
                resetForm();
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to add the book. Please try again.");
            }
        } catch (error) {
            console.error("Error adding the book:", error);
            alert("An error occurred while adding the book.");
        }
    };

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setPublicationDate("");
        setCoverImage(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add New Book</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400px",
                }}
            >
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter book title"
                    />
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        placeholder="Enter author name"
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter book description"
                    />
                </label>
                <label>
                    Publication Date:
                    <input
                        type="date"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Cover Image:
                    <input
                        type="file"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                </label>
                <button type="submit" style={{ marginTop: "10px" }}>
                    Add Book
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    style={{ marginTop: "10px" }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddBook;