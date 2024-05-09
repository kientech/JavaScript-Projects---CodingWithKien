document.addEventListener("DOMContentLoaded", function () {
  var postForm = $("#post-form");

  tinymce.init({
    selector: "#editor",
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
  });

  postForm.submit(function (event) {
    event.preventDefault();

    var title = $("#title").val();
    var description = tinymce.get("editor").getContent();
    var author = $("#author").val();
    var categories = $("#categories").val();
    var slug = createSlug(title);

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/blogs",
      data: {
        title: title,
        description: description,
        author: author,
        categories: categories,
        slug: slug,
      },
      success: function (response) {
        console.log("Post Successful", response);
      },
    });
  });
  function createSlug(title) {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
});
