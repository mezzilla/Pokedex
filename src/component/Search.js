import React from 'react'

const Search = () => {
    return (
        <div class="input-group mb-3">
            <input type="text" class="form-control"
                placeholder="Recipient's username" aria-label="Recipient's username"
                aria-describedby="basic-addon2">
            </input>
            <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Search</span>
            </div>
        </div>
    )
}

export default Search