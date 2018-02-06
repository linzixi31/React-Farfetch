import ajaxConstants from "../../constants/ajaxConstants";

export function checkList(){
    return{
        types:[ajaxConstants.AJAX_REQUESTING,ajaxConstants.AJAX_REQUESTED,ajaxConstants.AJAX_REQUESTERROR],
        methods:"get",
        url:"/checklist",
        params:{}
    }
}