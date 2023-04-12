//class definition for the Note entity
class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.createdAt = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    }
}
export default Note;
