// script.js

$(document).ready(function () {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const allowedTypes = ["video/mp4", "video/quicktime"]; // MP4, MOV

  $("#video-upload-form").on("submit", function (event) {
    event.preventDefault();
    const videoFile = $("#videoUpload")[0].files[0];

    if (!videoFile) {
      $("#upload-feedback").text("Please select a video file.");
      return;
    }

    if (!allowedTypes.includes(videoFile.type)) {
      $("#upload-feedback").text("Invalid file type. Only MP4 and MOV formats are allowed.");
      return;
    }

    if (videoFile.size > MAX_FILE_SIZE) {
      $("#upload-feedback").text("File size exceeds the 10MB limit.");
      return;
    }

    $("#upload-feedback").text(""); // Clear any feedback message

    const formData = new FormData();
    formData.append("video", videoFile);

    $.ajax({
      url: "/upload-video", // Set this to your server endpoint
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      xhr: function () {
        const xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (event) {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            $("#upload-progress").css("width", percentComplete + "%").text(percentComplete + "%");
          }
        });
        return xhr;
      },
      success: function (response) {
        $("#upload-feedback").text("Video uploaded successfully!");
        $("#upload-progress").removeClass("progress-bar-striped").addClass("bg-success");
      },
      error: function (xhr, status, error) {
        $("#upload-feedback").text("An error occurred during the upload.");
        $("#upload-progress").removeClass("progress-bar-striped").addClass("bg-danger");
      },
    });
  });
});
