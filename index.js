// Collection Functions (Arrays or Objects)

// myEach
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        callback(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        callback(collection[key], key, collection);
      }
    }
    return collection;
  }
  
  // myMap
  function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value, key, collection) => {
      result.push(callback(value, key, collection));
    });
    return result;
  }
  
  // myReduce
  function myReduce(collection, callback, acc) {
    let startIdx = 0;
    if (acc === undefined) {
      acc = collection[0];
      startIdx = 1;
    }
    myEach(collection.slice(startIdx), (value, key, collection) => {
      acc = callback(acc, value, collection);
    });
    return acc;
  }
  
  // myFind
  function myFind(collection, predicate) {
    let result;
    myEach(collection, (value, key, collection) => {
      if (predicate(value)) {
        result = value;
        return false; // Break the loop if a match is found
      }
    });
    return result;
  }
  
  // myFilter
  function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value, key, collection) => {
      if (predicate(value)) {
        result.push(value);
      }
    });
    return result;
  }
  
  // mySize
  function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
  }
  
  // Array Functions
  
  // myFirst
  function myFirst(array, n = 1) {
    return n === 1 ? array[0] : array.slice(0, n);
  }
  
  // myLast
  function myLast(array, n = 1) {
    return n === 1 ? array[array.length - 1] : array.slice(Math.max(array.length - n, 0));
  }
  
  // BONUS: mySortBy
  function mySortBy(array, callback) {
    return array.slice().sort((a, b) => callback(a) - callback(b));
  }
  
  // BONUS: myFlatten
  function myFlatten(array, shallow = false, newArr = []) {
    myEach(array, (value) => {
      if (Array.isArray(value) && !shallow) {
        myFlatten(value, false, newArr);
      } else {
        newArr.push(value);
      }
    });
    return newArr;
  }
  
  // Object Functions
  
  // myKeys
  function myKeys(object) {
    return Object.keys(object);
  }
  
  // myValues
  function myValues(object) {
    return myMap(myKeys(object), key => object[key]);
  }   
  
  // Test the functions with examples
  console.log(myEach([1, 2, 3], alert)); // Alerts 1, 2, 3 and returns [1, 2, 3]
  console.log(myEach({ one: 1, two: 2, three: 3 }, alert)); // Alerts 1, 2, 3 and returns { one: 1, two: 2, three: 3 }
  
  console.log(myMap([1, 2, 3], num => num * 3)); // Returns [3, 6, 9]
  console.log(myMap({ one: 1, two: 2, three: 3 }, (num, key) => num * 3)); // Returns [3, 6, 9]
  
  console.log(myReduce([1, 2, 3], (acc, val) => acc + val, 10)); // Returns 16
  console.log(myReduce({ one: 1, two: 2, three: 3 }, (acc, val) => acc + val)); // Returns 6
  
  console.log(myFind([1, 2, 3, 4, 5, 6], num => num % 2 === 0)); // Returns 2
  console.log(myFind({ one: 1, three: 3, four: 4, six: 6 }, num => num % 2 === 0)); // Returns 4
  
  console.log(myFilter([1, 2, 3, 4, 5, 6], num => num % 2 === 0)); // Returns [2, 4, 6]
  console.log(myFilter({ one: 1, three: 3, five: 5 }, num => num % 2 === 0)); // Returns []
  
  console.log(mySize({ one: 1, two: 2, three: 3 })); // Returns 3
  console.log(mySize([])); // Returns 0
  
  console.log(myFirst([5, 4, 3, 2, 1])); // Returns 5
  console.log(myFirst([5, 4, 3, 2, 1], 3)); // Returns [5, 4, 3]
  
  console.log(myLast([5, 4, 3, 2, 1])); // Returns 1
  console.log(myLast([5, 4, 3, 2, 1], 3)); // Returns [3, 2, 1]
  
  // Uncomment the following lines to test bonus functions
  // console.log(mySortBy([1, 2, 3, 4, 5, 6], num => Math.sin(num))); // Returns [5, 4, 6, 3, 1, 2]
  // const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
  // console.log(mySortBy(stooges, stooge => stooge.name)); // Returns [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]
  
  // console.log(myFlatten([1, [2], [3, [[4]]]])); // Returns [1, 2, 3, 4]
  // console.log(myFlatten([1, [2], [3, [[4]]]], true)); // Returns [1, 2, 3, [[4]]]
  
  console.log(myKeys({ one: 1, two: 2, three: 3 })); // Returns ["one", "two", "three"]
  console.log(myValues({ one: 1, two: 2, three: 3 })); // Returns [1, 2, 3]
  