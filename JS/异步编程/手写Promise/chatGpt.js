function MyPromise(executor) {
  // promise 状态
  let state = "pending";
  // promise 结果
  let result = undefined;
  // 存储 then 的回调函数
  let callbacks = [];

  // resolve 方法
  function resolve(value) {
    if (state !== "pending") return;
    state = "fulfilled";
    result = value;
    // 执行 then 的回调函数
    callbacks.forEach((callback) => callback.onFulfilled(value));
  }

  // reject 方法
  function reject(reason) {
    if (state !== "pending") return;
    state = "rejected";
    result = reason;
    // 执行 then 的回调函数
    callbacks.forEach((callback) => callback.onRejected(reason));
  }

  // then 方法
  this.then = function (onFulfilled, onRejected) {
    // 创建一个新的 Promise 实例
    const newPromise = new MyPromise((resolve, reject) => {
      // 封装原来的 onFulfilled 方法
      function handleFulfilled(value) {
        try {
          if (typeof onFulfilled === "function") {
            const returnedValue = onFulfilled(value);
            // 判断 onFulfilled 的返回值类型
            if (returnedValue instanceof MyPromise) {
              // 如果是 Promise 类型，则等待 Promise 完成后再 resolve
              returnedValue.then(resolve, reject);
            } else {
              // 否则直接 resolve
              resolve(returnedValue);
            }
          } else {
            // 如果 onFulfilled 不是函数，则直接 resolve
            resolve(value);
          }
        } catch (error) {
          // 发生异常时 reject
          reject(error);
        }
      }

      // 封装原来的 onRejected 方法
      function handleRejected(reason) {
        try {
          if (typeof onRejected === "function") {
            const returnedValue = onRejected(reason);
            // 判断 onRejected 的返回值类型
            if (returnedValue instanceof MyPromise) {
              // 如果是 Promise 类型，则等待 Promise 完成后再 resolve
              returnedValue.then(resolve, reject);
            } else {
              // 否则直接 resolve
              resolve(returnedValue);
            }
          } else {
            // 如果 onRejected 不是函数，则直接 reject
            reject(reason);
          }
        } catch (error) {
          // 发生异常时 reject
          reject(error);
        }
      }

      // 根据当前的状态执行相应的回调函数
      if (state === "pending") {
        callbacks.push({
          onFulfilled: handleFulfilled,
          onRejected: handleRejected,
        });
      } else if (state === "fulfilled") {
        // 这里完全模拟了异步
        setTimeout(() => handleFulfilled(result), 0);
      } else if (state === "rejected") {
        setTimeout(() => handleRejected(result), 0);
      }
    });

    return newPromise;
  };

  // 执行 executor
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
