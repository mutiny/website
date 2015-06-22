---
title: How good are my tests?
layout: article
---
# How good are my tests?

In attempting to answer the question "is my program correct?", one approach[^1] is to test your program. In which case, the question often becomes "how good are my tests?"

The short answer is: your tests aren't perfect.

To understand why, we must review some of the earliest work on the theory of testing.

## Perfect testing is infeasible

To be absolutely certain that a program is correct, it is necessary to test it exhaustively (i.e., on all possible inputs). Unfortunately, exhaustive testing is almost always infeasible, because even simple programs often have an unmanageably large number of possible inputs. Therefore, much of the effort and skill in testing is selecting a good subset of all possible inputs to use.

Understandably then, the earliest work on testing theory focused on how to define strategies that selected a subset of inputs, and were equivalent to performing an exhaustive test. [Goodenough and Gerhart](http://doi.ieeecomputersociety.org/10.1109/TSE.1975.6312836) define properties[^2] of a strategy that indicate whether or not it will always select a subset of inputs that are equivalent to an exhaustive test. However, the properties proposed by Goodenough and Gerhart were shown to be flawed[^3] both in theory and in practice.

The theoretical flaw stems from the incompleteness of non-exhaustive testing. A non-exhaustive testing can never be guaranteed to demonstrate that a program is correct: there is always the possibility that the program is correct for all of the inputs that have been selected, but incorrect for at least one of the inputs that have not been selected. [Dijkstra](http://www.informatik.uni-bremen.de/agbkb/lehre/programmiersprachen/artikel/EWD-notes-structured.pdf) makes this argument, and reaches his famous conclusion:

> Program testing can be used to show the presence of bugs, but never to show their absence.

As many of the programs that we wish to test are not black boxes (e.g., we can often inspect -- or reason about -- their source code), Dijkstra's conclusion is less damning in practice than it is in theory. If we can inspect the program to determine the way in which its behaviour varies over inputs, we can use this knowledge to guide the selection of inputs for testing. Indeed, before reaching his conclusion, Dijkstra makes it clear that his argument is against black-box testing, and his suggested remedy is to take into consideration the implementation of a program whilst reasoning about its correctness.

The practical flaw with the properties defined by Goodenough and Gerhart is demonstrated by [Weyuker and Ostrand](http://dx.doi.org/10.1109/TSE.1980.234485). They show that the properties can only be assessed by determining whether or not the program contains faults[^4] and if so, which types of fault. However, we do not know this information upfront (and, in fact, we wish to obtain it via testing).

## Is imperfect testing good enough?

Given that testing is almost always incomplete and hence cannot be used to prove a program correct, why does it remain popular?

Weyuker and Ostrand offer one answer. Their paper goes on to argue in favour of using problem-dependent judgement to determine which errors are likely to occur in a specific program. They then propose a theory of testing which seeks to reason about the absence of likely errors[^5] rather than the absence of all possible errors (i.e., program correctness). Essentially, Weyuker and Ostrand argue that testing allows the software engineer to control the tradeoff between the cost and benefit of testing:

> The problem is to combine realistically attainable characteristics of good tests with a reasonable level of confidence in test results.

Along these lines, arguably the best contemporary method for answering the question "how good are my tests?" (and hence "how sure am I that my program is correct?") is [mutation testing](mutation_testing.html).

## Footnotes

  [^1]: Other approaches often involve formal methods.
  [^2]: Goodenough and Gerhart propose that a strategy (data selection criterion) must be *reliable* and *valid* to be ideal (i.e., as effective as an exhaustive test). A reliable strategy always yields subsets of the input domain that produce consistent results: if one of the subsets indicates that the program is (in)correct, then all subsets selected by the strategy must indicate that the program is (in)correct. A valid strategy will always yield at least one subset of the input domain that detects a fault, if the program is incorrect.
  [^3]: Nonetheless, Goodenough and Gerhart's paper is widely regarded as seminal. They make several contributions that were groundbreaking. For example, they were the first to convincingly argue that tests that exercise every statement, path and predicate of a program do not guarantee the correctness of programs. They also make a strong argument for the use of formal methods and testing as complementary methods (in section 3.2).
  [^4]: Essentially, Weyuker and Ostrand argue that reliability of a strategy can only be assessed by knowing which faults are present in an incorrect program: if we do not know which faults are present in the program, we cannot be certain that the strategy is reliable (i.e., always selects a subset of the input domain that reveals the fault).
  [^5]: Weyuker and Ostrand propose equivalence partitioning to this end, which involves dividing the input domain into "smaller and more manageable pieces" and remains a popular approach to identifying fruitful tests.
