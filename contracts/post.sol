contract Post {

    address private author;
    bytes12 private title;
    bytes32 private content;


    function Post(bytes12 _title, bytes32 _content) {
        author = msg.sender;
        title = _title;
        content = _content;

    }

    function getInfo() constant returns (address, bytes12, bytes32) {
        return (author, title, content);
    }

    function getAuthor() constant returns (address) {
        return author;
    }

    function destroy() {
        if (author == msg.sender)
            suicide(author);

    }

}
