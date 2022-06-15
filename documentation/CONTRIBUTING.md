---
layout: simple
---

# Contributing to APCA

First, thank you for taking the time to contribute! Myndex is focused on the underlying perception research, and the needs of supporting developers is its own monumental task! Thank you for help and discussion on how best to serve the developer community.

The following is a set of guidelines for contributing to APCA and its packages, which are in various repos here on GitHub, depending on their target audience.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [APCA and Packages](#apca-and-packages)
  * [APCA Math Decisions](#math-decisions)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Specs Styleguide](#specs-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)

## Code of Conduct

This project and everyone participating in it is governed by the [Myndex Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are entereing a "safe space" for exploration and development. Please keep that in mind.

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. [Please start in the discussions tab.](https://github.com/Myndex/SAPC-APCA/discussions) 

## What should I know before I get started?

### APCA and Packages

APCA is a small open source project made up of several [repositories](https://github.com/Myndex/SAPC-APCA/blob/master/repoList.md). This section should help you with which and where to enter a pull request.

SEE [REPO LISTING](https://github.com/Myndex/SAPC-APCA/blob/master/repoList.md)

#### Package Conventions

TBD

### Math Decisions

Any changes to the functionality or results of the math, and math and constants implementations must come from (or go through) Myndex Research. The empirical data is not collated for public consumption as yet, and all math methods rely on the empirical research.

## How Can I Contribute?

### Reporting Bugs

Regsardless of the repo, bugs should be reported in the https://github.com/Myndex/SAPC-APCA/issues tab.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Check the [discussions](https://github.com/Myndex/SAPC-APCA/discussions)** for a list of common questions and problems.
* **Determine which repository the problem exists in**.
* **Perform a cursory search to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. 
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots** which show you following the described steps and clearly demonstrate the problem. 


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for APCA, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

PLACEHOLDERS TBD
* **Check the [debugging guide]()** for tips.
* **Check if there's already [a package]() which provides that enhancement.**
* **Determine [which repository the enhancement should be suggested in]().**
* **Perform a [cursory search]()** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Atom which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing to Atom? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.


### Pull Requests

The process described here has several goals:

- Maintain APCA's stability and accuracy
- Fix problems that are important to users
- Engage the community in working toward the best possible APCA implementation
- Enable a sustainable system for APCA's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### JavaScript Styleguide

All JavaScript code TBD

### Specs Styleguide


### Documentation Styleguide

* Use Markdown.

NOTES: This file was based in part on the Atom example.


