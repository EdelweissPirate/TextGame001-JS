function bringToFront(obj) {
    obj.parent.stop();
    obj.parent.setChildIndex(obj,obj.parent.children.length-1);
};
