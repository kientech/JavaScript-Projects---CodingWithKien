document.addEventListener("DOMContentLoaded", function () {
  var postForm = $("#post-form");

  tinymce.init({
    selector: "#editor",
    height: 300,
    menubar: true,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    content_style: "body { font-family: Poppins, sans-serif; font-size: 16px }",
    setup: function (editor) {
      editor.on("change", function () {
        // Bạn có thể thực hiện các hành động khi nội dung thay đổi
      });
    },
  });

  postForm.submit(function (event) {
    event.preventDefault();

    var title = $("#title").val();
    var description = tinymce.get("editor").getContent(); // Lấy nội dung từ TinyMCE
    var author = $("#author").val()
    var categories = $("#categories").val()

    var slug = createSlug(title);
    
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/articles",
      data: {
        title: title,
        description: description,
        author: author,
        categories: categories,
        slug: slug,
      },
      success: function (response) {
        console.log("Post successful:", response);
        // Redirect or perform other actions as needed
      },
      error: function (error) {
        console.error("Error posting data:", error);
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
