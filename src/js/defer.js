export default function defer(fn/*, arg1, arg2, ... */) {
    var args = Array.prototype.slice.call(arguments, 1);
    setTimeout(fn.bind(this, args), 0);
}
