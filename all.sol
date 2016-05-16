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
contract User {

    address private owner;
    bytes32 private email;
    bytes32 private username;
    bytes32 private name;
    Addresses private posts;

    struct Addresses {
        uint size;
        mapping (uint => address) array;
    }

    function User (bytes32 _username, bytes32 _name, bytes32 _email) {
        owner = msg.sender;
        username = _username;
        name = _name;
        email = _email;
        posts = Addresses(0);
    }

    function edit(bytes32 _name, bytes32 _email) constant returns ( bool ) {
        if (owner != msg.sender)
            return false;
        name = _name;
        email = _email;
        return true;
    }

    function getProfile() constant returns (bytes32, bytes32, bytes32, uint) {
        return (username, name, email, posts.size);
    }

    function getOwner() constant returns (address) {
        return owner;
    }

    function getPost(uint i) constant returns (address) {
        if (i < posts.size)
            return (posts.array[i]);
        return 0x0;
    }

    function addPost(bytes12 _title, bytes32 _content) constant returns (bool) {
        if (owner != msg.sender)
            return false;
        Post post = new Post(_title, _content);
        posts.array[posts.size] = post;
        posts.size ++;
        return true;
    }

    function removePost(address post) constant returns (bool) {
        if (owner == msg.sender)
            for( uint i = 0; i < posts.size; i ++)
                if (posts.array[i] == post) {
                    if (i == (posts.size-1)){
                        Post(posts.array[i]).destroy();
                        delete posts.array[i];
                    } else {
                        for( uint z = i; z < posts.size; z ++)
                            posts.array[z] = posts.array[z+1];
                        Post(posts.array[posts.size-1]).destroy();
                        delete posts.array[posts.size-1];
                    }
                    posts.size --;
                    return true;
                }
        return false;
    }

    function destroy () {
        if (owner != msg.sender){
            for(uint i = 0; i < posts.size; i ++)
                Post(posts.array[i]).destroy();
            suicide(owner);
        }

    }

}
