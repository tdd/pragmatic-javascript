YUI().use("uploader","array-extras", function (Y) {
    if (Y.Uploader.TYPE != "none" && !Y.UA.ios) {
        var uploader = new Y.Uploader({
            width:"150px",height:"30px",
            multipleFiles: true,
            swfURL: "../../build/uploader/assets/flashuploader.swf?t=" + Math.random(),
            uploadURL: "http://www.yswfblog.com/upload/simpleupload.php",
            simLimit: 2,
            withCredentials: false,
            srcNode:"#filSelector",
            render:true
        });
        var uploadDone = false,ddmessage = Y.one("#ddmessage"),
            uploadFilesButton = Y.one("#uploadFilesButton");
        if (Y.Uploader.TYPE == "html5") {
            uploader.set("dragAndDropArea", document);
            ddmessage.setHTML("<strong>Drag and drop files here.</strong>");

            uploader.on(["dragenter", "dragover"], function (event) {
                if (ddmessage) {
                    ddmessage.setHTML("<strong>Files detected, drop them here!</strong>");
                    ddmessage.setStyle("background","yellow");
                }
            });

            uploader.on(["dragleave", "drop"], function (event) {
                var ddmessage = Y.one("#ddmessage");
                if (ddmessage) {
                    ddmessage.setHTML("<strong>Drag and drop files here.</strong>");
                    ddmessage.removeClass("yellowBackground");
                }
            });
        }

        var ICONS = {
            word:["doc", "docx", "dot", "dotx"],
            image:["jpg", "jpeg", "gif", "png"]
        }


        function getFileClass(fileName) {
            var ext = (fileName.match(/\.(.+?)$/) || [])[1].toString().toLowerCase(),
                type;
            Y.each(ICONS,function(array,index){
                if (Y.Array.some(array,function(i){return i === ext}) ) {
                    type = index;
                    return false
                }
            });
            return type
        }
        uploader.after("fileselect", function (event) {

            var fileList = event.fileList;
            var fileUlist = Y.one("#uploads");
            if (fileList.length > 0 && ddmessage) {
                ddmessage.remove();
            }

            if (uploadDone) {
                uploadDone = false;
                fileUlist.setHTML("");
            }

            Y.each(fileList, function (fileInstance) {
                fileUlist.append("<li class='" + getFileClass(fileInstance.get("name"))  + "'>" +
                    "<span class='filename'>" + fileInstance.get("name") + "</span><button><img src='remove.png' alt='Remove' /></button>");
            });
        });

        uploader.on("uploadstart", function (event) {
            uploader.set("enabled", false);
            uploadFilesButton.addClass("yui3-button-disabled");
            uploadFilesButton.detach("click");
        });

        uploader.on("alluploadscomplete", function (event) {
            uploader.set("enabled", true);
            uploader.set("fileList", []);
            uploadFilesButton.removeClass("yui3-button-disabled");
            uploadFilesButton.on("click", function () {
                if (!uploadDone && uploader.get("fileList").length > 0) {
                    uploader.uploadAll();
                }
            });
            uploadDone = true;
        });
        uploadFilesButton.on("click", function () {
            if (!uploadDone && uploader.get("fileList").length > 0) {
                uploader.uploadAll();
            }
        });
    }
    else {
        Y.one("#uploaderContainer").set("text", "We are sorry, but to use the uploader, you either need a browser that support HTML5 or have the Flash player installed on your computer.");
    }
})