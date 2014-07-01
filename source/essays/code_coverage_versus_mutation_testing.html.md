# Code coverage

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

Perhaps surprisingly, this single test case achieves 100% code coverage: every statement in the isPalindrome method. I suspect that few programmers would feel that this single test case is sufficient. Some other test cases that we might wish to write might be:

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


Both in theory and in practice, code coverage (or more precisely statement coverage) turns out to be quite a weak mechanism for assessing and improving the quality of a program.






How does mutation testing comparing to code coverage for this example? Applying[^2] PIT and Mutant to the program and test case above reveals a number of mutants, which we'll now inspect in turn. The first mutant that is encountered is shown below:



Mutant reveals the following additional mutant

Despite the perfect code coverage score, I suspect that many programmers would feel that the one test case above provides insufficient evidence that this code is of high quality. They would be right to be doubtful: mutation testing of this code confirms that several further tests cases are needed, and also identifies a bug, as we shall see.


% Despite already achieving perfect statement and branch coverage, I suspect that many programmers would add additional test cases to, for example, check that the \emph{isPalindrome} method returns false for a non-palindromic argument:
% 
% \begin{lstlisting}[language=Java]
% @Test
% public void detectsNonPalindrome() { 
%   assertFalse(isPalindrome("midnight"));
% }
% \end{lstlisting}
% 
% I suspect that some programmers might also add statements a test to check that the \emph{isPalindrome} method has sensible behaviour when its argument is the empty string:
% 
% \begin{lstlisting}[language=Java]
% @Test
% public void detectsEmptyStringPalindrome() { 
%   assertTrue(isPalindrome(""));
% }
% \end{lstlisting}

  [^1]: The term *code coverage* is quite widely used in practice, but it's a little imprecise. Most often, I see code coverage used to mean *statement coverage*, which measures the proportion of the statements of a program that have been executed by a test suite. There are other types of code coverage too, including *branch coverage* (the proportion of control flow branches that have been executed), *decision coverage* (the proportion of boolean sub-expressions that have been executed), *path coverage* (the proportion of control flow paths through the program that have been execute), and many more. In this essay, I use the term code coverage to mean statement coverage.
  [^2]: To obtain these results, I used version XYZ of PIT and version ABC of Mutant. For Mutant, I ported the program to Ruby and tests to RSpec.