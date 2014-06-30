/**
 * Created by georg on 6/23/14.
 */

var zoomPhoto = function(projectId) {
    // disable all hrefs
    $(".main-content .photo a").css("display", "none");
    // enable one we need
    $(".main-content .photo .invisible" + projectId).css("display", "block");
};
