<p align="center"><img src="https://github.com/MostafaRastegar/mr-next-starter/raw/main/mr-next-starter.jpg" alt="BoxBouncing"/></p>
<h1 align="center" style="color:#008ee5;">mr-next-starter</h1>
<h3 align="center" style="color:#666666;">Start your project the easiest way</h3>
<p align="center" style="font-weight: 900">
    Highly flexible , High scalability ,Redux , Axios , Redux-thunk , Redux-persist, Styled-components , ESlint and Prettier
</div>

This project is based on the [Nextjs](https://nextjs.org/docs/getting-started 'Nextjs').

In this structure, we tried to bring you a good experience by combining different technologies.

## The main structure is as follows:

- **`components`**
  - **`Common`** _general components_
  - **`Pages`** _partials and styles for every main pages_
- **`pages`** _main pages_
- **`helpers`** _utils and javascript helpers_
- **`constants`**
  - **`theme`** _config global colors and styles_
  - **`endpoints`** _object of endpoints servieces_
- **`store`** _redux repository for every main screen_

## installation:

Assuming that you have [Node 14 or 16 LTS](https://nodejs.org/en/download/ 'Node 14 Or 16 LTS') or greater installed, you can use npm to install the Expo CLI command line utility:

_Install eslint, prettier and editor config plugins into your IDE_

1. `git clone https://github.com/MostafaRastegar/mr-next-starter.git`

2. `cd mr-next-starter`

3. `npm install` or `yarn`

4. `npm run dev` or `yarn dev`

## document:

### Store structures:

You create a folder for each main part of the reducer, for example, the users' folder used in the Redux store.

#### Users structures:

- **store**
  - **users**
    - **actions**
    - **effects**
    - **reducers**
    - **services**
    - **types**

#### Introducing types:

Includes an object of all types used in Users actions. Here are three types of typing for each request:

**REQUEST, SUCCESS, FAILURE**

    const types = {
    ...
      GET_USERS_REQUEST: 'GET_USERS_REQUEST',
      GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
      GET_USERS_FAILURE: 'GET_USERS_FAILURE',
    ...
    };

#### Introducing actions:

Includes an object of all actions used in users side effects
Here are three types of action for each request:
**request, success, failure**

Naming actions are based on what they want to do. For example, when requesting we use get, post, which affects the action name.
To make it easier to use the actions in different parts of the project, the 'actionMaker' helper has been used, in which case each action determines which type it belongs to. And when calling it, you no longer need to pass the type.

    const types = {
    ...
      getUsersRequest: actionMaker (types.GET_USERS_REQUEST),
      getUsersSuccess: actionMaker (types.GET_USERS_SUCCESS),
      getUsersFailure: actionMaker (types.GET_USERS_FAILURE),
    ...
    };

#### Introduction of reducers:

reducers determine the structure of each part of our store. We have here for each request three main parameters
**loading, data, error**

Consider that it responds to requests based on the response it receives from the server.

#### Introducing selectors:

selectors is an object that is responsible for getting data from the store. For example, if you need to read users' data at any time.
You use the following function:
`getUsersData`

The naming of this function has three main parts.
**get**: which always comes first in all the values ​​of this object.
**name**: The name of the item mentioned in the store, for example, Users
**Content-type**: which can be **'data', 'loading'**, and other items.

You can read the [reselect](https://github.com/reduxjs/reselect 'reselect') documentation for more.

#### Introduction of services:

Services is an object that lists the requests that are to be made. And we get the **'get', 'post'** operation based on the endpoints we have using **Axios**.
From now on to request. It is enough to call the function of that request from this section.

#### Introducing effects:

effects is an object in which the side-effects of a request are executed by the **async, await** operation, and it specifies what actions are called in order during the request. And what data to transfer to the store. For this part we used **redux-thunk**. If you want, you can use the **redux-saga** and ... with changes.

> Remember that after completing the work, each section must be introduced in the 'index' file located in the store. So you can call them in the components.

**for example:**

    export {default as usersSelectors} from './users/selectors';
    export {default as usersEffects} from './users/effects';
    export {default as usersActions} from './users/actions';
    export {default as usersServices} from './users/services';
    export {default as usersTypes} from './users/types';

## USAGE:

#### How to dispatch action request and get data from the store in a component:

Here we are on the track **~/components/Pages/Users/index.tsx**
We created a component to display users that displays their list after requesting.
First, we import **usersEffects** and **usersSelectors** objects from the store on the component.

In the **didMount** component, we call a function related to the desired request.

     useEffect (() => {
        dispatch (usersEffects.getUsersRequest ());
      }, []);

All steps of extracting to store data in **the store** are handled by **effects**.

_For read the new data from the store_, just call the corresponding **selector**.

**for example:**

      const UsersData = useSelector ((state) =>
        usersSelectors.getUsersData (state),
      );

Finally, after loading is **'false'**, you can display the list of users.
