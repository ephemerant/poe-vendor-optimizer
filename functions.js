// Returns the sum of all items in A
function sum(A) {
  var S = 0;

  for (var i = 0; i < A.length; i++) S += A[i].quality;

  return S;
}

// Returns a subarray of integers from A that produce the smallest sum >= N
function smallest(N, A) {
  var n = sum(A);  // Largest possible result
  var a = A;       // Largest possible array

  if (N <= 0 || n < N)  // Is it impossible?
    return [];

  for (var i = 0; i < A.length; i++) {
    if (n == N)  // Are we already perfect?
      return a;

    var x = A[i];  // Element in A

    var _a = A.slice(i + 1);  // Subarray to the right of x

    _a = smallest(N - x.quality, _a);  // Recurse
    _a.unshift(x);             // Add x to beginning

    var _n = sum(_a);  // Sum of the subarray

    if (_n < n && _n >= N) {  // Is this subarray better?
      n = _n;
      a = _a;
    }
  }

  return a;  // Return the best possible
}

// Parses out quality, rarity, and name from PoE item paste data
function processData(data) {
  var quality = /Quality: \+(\d+)%/.exec(data);
  var rarity = /Rarity: (\w+)/.exec(data);
  var lines = data.split('\n');

  if (quality && rarity && lines.length > 1)
    return {name: lines[1], quality: +quality[1], rarity: rarity[1]};
}