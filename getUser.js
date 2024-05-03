// Returns UserId from header ("Bearer [UserId]|[UID]")
export function getUserId(header) {
    if (header == undefined) return "No header";    
    if (!header.toLowerCase().startsWith("bearer ")) return "No bearer header";

    const elements = header.substring(7).split('|');    
    return elements[0].trim();
}