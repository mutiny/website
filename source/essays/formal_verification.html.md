# 

Notes on MacKenzie's Mechanizing Proof (chapter 6 unless otherwise stated)
 - Inductive vs deductive reasoning. The former involves generalising from instances (e.g., testing); the latter involves reasoning about instances from (a combination of) general laws (e.g., proof). (chapter 1)
 - DeMillo et al's objection: mathematical proof is a social process, and the proofs used for formal verification were not being subjected to this social process because, for example, they were too long and dull
 - Fetzer's objection: absolute verification is not possible for software because eventually they run on machines which affect something physical. Proving that 2 + 2 = 4 does not guarantee that when we mix 2 lumps of plutonium with 2 lumps of plutonium necessarily produces 4 lumps of plutonium.
 - (Nonetheless, relative verification remains valuable, in the same way that non-exhaustive testing remains valuable: we can build confidence in a system and detect faults, though not guarantee absolute correctness).
 - Verified hardware (e.g., Computational Logic Inc) narrows the gap between formal verification and physical reality.
 - If formal verification isn't absolute and exhaustive testing is largely infeasible, how do we make convincing arguments about the dependability / correctness of systems?
     - Working around errors (human repair). See pg 303.
     - Appeal to authority (e.g. via code review and testing; pg 304). Sociotechnical processes which result in critical code being written by most dependable programmmers.
     - Human judgement (see end of chapter 9): it is our interpretation of the results produced by a computer that ultimately lead to an argument about its correctness
 - Is model checking the same as massive testing? (see pg 315)
     


[^1] D. MacKenzie, Mechanizing Proof, MIT Press, 2001.