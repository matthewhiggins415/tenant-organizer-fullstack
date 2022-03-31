# Welcome to easyRent Property Manager: 
This project was inspired by a recent move from Oahu to Denver. In that move I needed to find an apartment and thought it was interesting that each apartment building typically has a website listing the available apartments. This easyRent project is a property manager application where property owners can add their available properties, add tenants to those properties, and add tasks to those properties should there be any outstanding to-do items. 

### Setup to run frontend 
1. clone ``` git clone git@github.com:matthewhiggins415/tenant-organizer-fullstack.git ```
2. ``` npm install ```
3. ``` npm run server ```
4. [EasyRent Frontend Repo](https://github.com/matthewhiggins415/easyRentFrontEnd) ..should you need it

### Technologies Used: 
- express 
- mongoose
- mongodb
- passport 
- jsonWebTokens
- cors
- bcrypt
- axios

### ERD:
<img src="https://user-images.githubusercontent.com/67120920/160949246-d1070ab7-aaf8-431a-910c-144c33bc51d1.jpg" alt="app data screen" style="width:550px; height:auto; margin:0 auto;"/>


### Backend Routes:
| Verb      | Route                     | Description                                | Resource  |
| --------- | -------------             | -----------------------                    | --------  |
| POST      | /sign-up                  | sign up a user                             | User      |
| POST      | /sign-in                  | sign in a user                             | User      |
| GET       | /user/:id                 | get a user                                 | User      |
| DELETE    | /sign-out                 | log out a user                             | User      |
| UPDATE    | /user/:id                 | update a user                              | User      |
| POST      | /property                 | create an property                         | Property  |
| GET       | /property                 | get all properties                         | Property  | 
| GET       | /property/:id             | get a single property                      | Property  |
| PATCH     | /property/:id             | update a single property                   | Property  |
| DELETE    | /property/:id             | delete a single property                   | Property  |
| PATCH     | /propertytask/:id         | add a task to property                     | Property  | 
| DELETE    | /propertytask/:id/:taskId | remove a task from a property              | Property  | 
| POST      | /tenant                   | create a tenant                            | Tenant    |
| GET       | /tenants/:id              | get all tenants belonging to property      | Tenant    |
| GET       | /tenant/:id               | get a single tenant                        | Tenant    |
| GET       | /tenants                  | get all tenants belonging to user          | Tenant    |
| UPDATE    | /tenant/:id               | update a single tenant                     | Tenant    |
| DELETE    | /tenant/:id               | delete a tenant                            | Tenant    |



