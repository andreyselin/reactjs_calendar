export const useClickOutside = (ref, whatToDo) => {

    function handleClickOutside(e) {

        let theNode = e.target;
        while(theNode) {
            if (theNode === ref.current) {
                theNode = null;
            } else {
                theNode = theNode.parentNode || null;
                if (theNode === null) {

                    whatToDo();
                    stopHideListener();
                }
            }
        }

        // if (ref.current && !ref.current.contains(e.target)) {}
    }

    function startHideListener () { document.addEventListener    ("mousedown", handleClickOutside) }
    function stopHideListener  () { document.removeEventListener ("mousedown", handleClickOutside) }

    return { startHideListener, stopHideListener };
};
