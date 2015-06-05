---
title: Coverage vs. Mutation
layout: article
---
### Code coverage vs. mutation testing

Code coverage[^1] is a metric for assessing the quality of a test suite. Code coverage indicates the parts of a program that are executed during testing. The purpose of code coverage is often to find parts of the program that are untested, and then to write new tests to cover (or *exercise*) those parts of the program. Code coverage is quite widely used in practice (at least compared to [mutation testing](mutation_testing.html)), but can be quite ineffective for establishing confidence in the quality of a test suite, as this essay demonstrates.

Consider the example program below, which is written in Java. The program is intended to determine whether or not its argument reads the same backwards as forwards.

~~~ java
public static boolean isPalindrome(String s) {
  if (s.length() <= 1) {
    return true;

  } else {
    char first = s.charAt(0);
    char last = s.charAt(s.length() - 1);
    String mid = s.substring(1, s.length() - 1);

    return first == last && isPalindrome(mid);
  }
}
~~~

A reasonable first test for this program is to check that true is returned for a palindrome:

~~~ java
@Test
public void acceptsPalindrome() {
  assertTrue(isPalindrome("noon"));
}
~~~

Perhaps surprisingly, this single test case achieves 100% code coverage: every statement in the *isPalindrome* method is executed at least once by this test case.

Despite achieving perfect code coverage, this single test doesn't seem sufficient. I suspect that many programmers would agree, and might wish to write one or more of the following additional tests:

~~~ java
@Test
public void rejectsNonPalindrome() {
  assertFalse(isPalindrome("midnight"));
}

@Test
public void rejectsNearPalindrome() {
  assertFalse(isPalindrome("neon"));
}

@Test
public void acceptsEmpty() {
  assertTrue(isPalindrome(""));
}
~~~

I would argue that all of the tests above seem to be sensible, and increase our confidence in the implementation of the *isPalindrome* method. However, none of these tests are required to achieve 100% code coverage.

<!-- Despite the perfect code coverage score, I suspect that many programmers would feel that the one test case above provides insufficient evidence that this code is of high quality. They would be right to be doubtful: mutation testing of this code confirms that several further tests cases are needed, and also identifies a bug, as we shall see. -->

Both in theory and in practice, code coverage turns out to be quite a weak mechanism for assessing and improving the quality of a program.

#### Mutation Testing
[Mutation testing](mutation_testing.html) requires test suites to satisfy a stricter requirement than code coverage. Rather than merely exercising statements, mutation testing requires a test suite to be able to identify faulty versions of the software-under-test.

Improving a test suite via mutation testing involves adding new test cases to detect mutants that have not been detected by the existing test suite. Let's apply mutation testing to the *isPalindrome* method.

Applying PIT[^2], a mutation testing tool for Java, to the single test case that achieves 100% code coverage results in a mutation score of 56%: 9 mutants were created, and 4 were not detected by our single test case. One of the undetected mutants is shown below:

~~~ java
@Test
public static boolean isPalindrome(String s) {
  if (s.length() > 1) {
    return true;

  } else {
    ...
  }
}
~~~

Note that the predicate of the conditional expression has been negated, but this has not been detected by our single test case. This mutant tells us that our test suite accepts an implementation of *isPalindrome* that doesn't really distinguish between palindromic and non-palindromic strings: our current test suite only requires isPalindrome to return true.

The addition of a test case to check that *isPalindrome* returns false for non-palindromic words detects this mutant:

~~~ java
@Test
public void rejectsNonPalindrome() {
  assertFalse(isPalindrome("midnight"));
}
~~~

After adding this test, our test suite achieves a 78% mutation score. PIT reports that 2 further mutants remain undetected. One of these remaining undetected mutants is shown below:

~~~ java
public static boolean isPalindrome(String s) {
  if (...) {

  } else {
    ...

    return first == last && !isPalindrome(mid);
  }
}
~~~

Note that the right-hand side of the final expression in the method has been negated, but this has not been detected by our test suite. This mutant tells us that our test suite doesn't use inputs that cause recursive calls to contribute to deciding that a string is non-palindromic. In our current test suite, the only non-palindromic input, *midnight*, has different first and last letters and so the mutated expression is shortcut before the recursive call is made.

The addition of a test case to check that *isPalindrome* rejects a string with the same first and last letter but a non-palindromic middle detects this mutant:

~~~ java
@Test
public void rejectsNearPalindrome() {
  assertFalse(isPalindrome("neon"));
}
~~~

After adding this test, our test suite achieves an 89% mutation score, and PIT reports that 1 mutant remains undetected:

~~~ java
@Test
public static boolean isPalindrome(String s) {
  if (s.length() <= 0) {
    return true;

  } else {
    ...
  }
}
~~~

Note that the predicate of the conditional expression has been changed to test that the length of the input is <= 0, rather than <= 1. This mutant tells us that our test suite never results in a call to *isPalindrome* with a string of length 1. In our current test suite, all of the inputs to *isPalindrome* have been strings whose length is an even number.

The addition of a test suite to check that *isPalindrome* works for a palindrome whose length is an odd number detects this mutant:

~~~ java
@Test
public void acceptsOddPalindrome() {
  assertTrue(isPalindrome("eve"));
}
~~~

Now, PIT finally reports that we have a 100% mutation score. Our final test suite comprises the following 4 test cases:

~~~ java
@Test
public void acceptsPalindrome() {
  assertTrue(isPalindrome("noon"));
}

@Test
public void rejectsNonPalindrome() {
  assertFalse(isPalindrome("midnight"));
}

@Test
public void rejectsNearPalindrome() {
  assertFalse(isPalindrome("neon"));
}

@Test
public void acceptsOddPalindrome() {
  assertTrue(isPalindrome("eve"));
}
~~~

As we have seen via this example, mutation testing provides a more rigorous assessment of the quality of a test suite than code coverage. It can be relatively straightforward to achieve 100% code coverage, but achieving 100% mutation score requires us to write tests that provide greater assurances that the system behaves as expected.

In short, mutation testing imposes stricter requirements on our test suite than code coverage, and hence provides greater confidence in the quality of our code.


  [^1]: The term *code coverage* is quite widely used in practice, but it's a little imprecise. Most often, I see code coverage used to mean *statement coverage*, which measures the proportion of the statements of a program that have been executed by a test suite. There are other types of code coverage too, including *branch coverage* (the proportion of control flow branches that have been executed), *decision coverage* (the proportion of boolean sub-expressions that have been executed), *path coverage* (the proportion of control flow paths through the program that have been execute), and many more. In this essay, I use the term code coverage to mean statement coverage.
  [^2]: To obtain these results, I used version [PIT](http://pitest.org) v0.33.
