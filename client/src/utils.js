export function isEmpty(obj) {
    if (obj == null) return true;
    if (typeof obj !== "object") return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
