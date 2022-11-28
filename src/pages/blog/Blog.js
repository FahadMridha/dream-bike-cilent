import React from "react";
import profile from "../../assets/image/76943796_2523040774460559_5966309791528648704_n.jpg";

const Blog = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-6">
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100">
        <article>
          <h2 className="text-xl font-bold">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <p className="mt-4 dark:text-gray-400">
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL state.
            Local (UI) state-Local state is data we manage in one or another
            component. <br />
            Global (UI) state- Global state is data we manage across multiple
            components. <br />
            Server state- Data that comes from an external server that must be
            integrated with our UI state. <br />
            URL state- Data that exists on our URLs, including the pathname and
            query parameters.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <img
              src={profile}
              alt="/"
              className="w-10 h-10 rounded-full dark:bg-gray-500"
            />
            <div>
              <h3 className="text-sm font-medium">Fahad Mridha</h3>
              <time
                datetime="2022-11-28"
                className="text-sm dark:text-gray-400"
              >
                Nov 28th 2022
              </time>
            </div>
          </div>
        </article>
      </div>
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100">
        <article>
          <h2 className="text-xl font-bold">
            How does prototypical inheritance work?
          </h2>
          <p className="mt-4 dark:text-gray-400">
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the [[Prototype]] of an
            object, we use Object. getPrototypeOf and Object. When it comes to
            inheritance, JavaScript only has one construct: objects. Each object
            has a private property which holds a link to another object called
            its prototype.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <img
              src={profile}
              alt="/"
              className="w-10 h-10 rounded-full dark:bg-gray-500"
            />
            <div>
              <h3 className="text-sm font-medium">Fahad Mridha</h3>
              <time
                datetime="2022-11-28"
                className="text-sm dark:text-gray-400"
              >
                Nov 28th 2022
              </time>
            </div>
          </div>
        </article>
      </div>
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100">
        <article>
          <h2 className="text-xl font-bold">
            What is a unit test? Why should we write unit tests?
          </h2>
          <p className="mt-4 dark:text-gray-400">
            The main objective of unit testing is to isolate written code to
            test and determine if it works as intended. Unit testing is an
            important step in the development process, because if done
            correctly, it can help detect early flaws in code which may be more
            difficult to find in later testing stages.This makes your
            implementation details in your code shorter and easier to
            understand. In this instance, the best time to write unit tests is
            immediately. For others, most developers write unit tests after the
            code's been written.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <img
              src={profile}
              alt="/"
              className="w-10 h-10 rounded-full dark:bg-gray-500"
            />
            <div>
              <h3 className="text-sm font-medium">Fahad Mridha</h3>
              <time
                datetime="2022-11-28"
                className="text-sm dark:text-gray-400"
              >
                Nov 28th 2022
              </time>
            </div>
          </div>
        </article>
      </div>
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100">
        <article>
          <h2 className="text-xl font-bold">React vs. Angular vs. Vue?</h2>
          <p className="mt-4 dark:text-gray-400">
            Vue provides higher customizability and hence is easier to learn
            than Angular or React. Further, Vue has an overlap with Angular and
            React with respect to their functionality like the use of
            components. Hence, the transition to Vue from either of the two is
            an easy option. Vue. js combined the top-level features of React and
            Angular, but its main feature is the perfect user experience. Also,
            it leveraged the capacity of the virtual DOM and optimized the code
            structure.It's easier to learn Vue than angular and it reasonably
            takes the same amount of time and effort as learning react. Although
            some people argue that it's even easier to learn than react but
            that's of course subjective and varies from person to person.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <img
              src={profile}
              alt="/"
              className="w-10 h-10 rounded-full dark:bg-gray-500"
            />
            <div>
              <h3 className="text-sm font-medium">Fahad Mridha</h3>
              <time
                datetime="2022-11-28"
                className="text-sm dark:text-gray-400"
              >
                Nov 28th 2022
              </time>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
