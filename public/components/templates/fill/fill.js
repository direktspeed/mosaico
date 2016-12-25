/* Require things export view
<script src="vendor/jquery.min.js"></script>
<script src="vendor/knockout.js"></script>
<script src="vendor/jquery-ui.min.js"></script>
<script src="vendor/jquery.ui.touch-punch.min.js"></script>
<script src="vendor/load-image.all.min.js"></script>
<script src="vendor/canvas-to-blob.min.js"></script>
<script src="vendor/jquery.iframe-transport.js"></script>
<script src="vendor/jquery.fileupload.js"></script>
<script src="vendor/jquery.fileupload-process.js"></script>
<script src="vendor/jquery.fileupload-image.js"></script>
<script src="vendor/jquery.fileupload-validate.js"></script>
<script src="vendor/knockout-jqueryui.min.js"></script>
<script src="vendor/tinymce.min.js"></script>
<script src="mosaico/components/mosaico/"></script>
*/
jQuery(function() {


if (!Mosaico.isCompatible()) {
  alert('Update your browser!');
  return;
}



// var basePath = window.location.href.substr(0, window.location.href.lastIndexOf('/')).substr(window.location.href.indexOf('/','https://'.length));
var basePath = window.location.href;
if (basePath.lastIndexOf('#') > 0) basePath = basePath.substr(0, basePath.lastIndexOf('#'));
if (basePath.lastIndexOf('?') > 0) basePath = basePath.substr(0, basePath.lastIndexOf('?'));
if (basePath.lastIndexOf('/') > 0) basePath = basePath.substr(0, basePath.lastIndexOf('/'));

var plugins;
// A basic plugin that expose the "viewModel" object as a global variable.
// plugins = [function(vm) {window.viewModel = vm;}];

var ok = Mosaico.init({
    imgProcessorBackend: basePath+'/img/',
    emailProcessorBackend: basePath+'/dl/',
    titleToken: "MOSAICO Responsive Email Designer",
    fileuploadConfig: {
      url: basePath+'/upload/',
      // messages??
    }
  }, plugins);

if (!ok) {
  console.log("Missing initialization hash, redirecting to main entrypoint");
  // document.location = ".";
}
});
