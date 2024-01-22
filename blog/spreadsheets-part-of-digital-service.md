---
title: Your spreadsheets are part of your digital service
layout: post.njk
date: 2023-12-28
summary: Spreadsheets are often thought as out of the control of digital service teams, but they're part of your service.
---

In my career as a software developer I've worked on a lot of "back office" services for large organisations. Services that are generally used by a small set of internal users to support the business's priorities. And something that comes up time and time again is **spreadsheets**.

Spreadsheets are helpful tools that let you manage your data flexibly. You can analyse data, manipulate it on mass and filter it to useful sets. They're typically seen as a problem to digital teams though, as they move these processes out of sight and out of the team's control.

Spreadsheets can be really helpful as a crutch when the digital service doesn't do what's needed: if users can export data, manipulate it in a spreadsheet, and re-upload it then they can fix problems quickly and with nuance. But that lack of control is a double-edged sword, as it also allows users to break or delete data. Even where users can only read data, it lacks the context to interpret correctly and is not kept up-to-date.

The uncomfortable truth is that spreadsheets often end up as part of your digital service. They're an important part of the work your users do and they integrate with your products. However, they're also typically out of your control (if you can even see them) and lack the guardrails that you would normally put in place around data view and manipulation.

So what are you to do? One option is to cut users off: stop providing them with easy access to the data (e.g. remove your CSV exports) and force them to use your products instead. This fixes the problem from your point-of-view but is likely to negatively impact your relationship with your users, a relationship which is extremely valuable when building internal services.

You might also find that users find other ways to get your data, even more outside your control. I've encountered users setting up screen scrapers to generate CSVs, or even writing scripts to perform a flood of API requests to get at the data they want.

I think there are two key things to consider when caught in this situation: **educating your users** and **providing a better product**.

You should educate your users on the risks of spreadsheets, drawing on real examples of when things have gone wrong. Set up soft guardrails of what they can do with spreadsheets, and what they shouldn't. Encourage a dialogue so that you can advise them of how best to use the data.

In parallel with this, you should improve your product to reduce your users' reliance on spreadsheets. The spreadsheets are providing a need that you're not fulfilling, so you must identify that need and try to address it yourself. People typically don't _want_ to use spreadsheets, and they often start as "temporary" fixes with the hope that they won't be needed for long. When, as I've often seen, those spreadsheets are still being used several years later, it's in part because the service team still haven't addressed that need.

I think a lot of digital teams could benefit from changing their view on spreadsheets to see them (and indeed any other off-product processes) as part of the service the team provides. If you had written code that you couldn't see or control, then you'd look to safely and progressively replace it. The same should be true for spreadsheets.

---

I recently heard about a company who are so wrapped up in spreadsheets that they hire an "excel expert" to go between teams and identify ways of automating processes and make better use of their tools. Their work has reduced costs as it frees up of staff time and leads to some leavers not needing to be replaced.

It sounded like an absurd situation, but the more I think about it the more I see the expert as a one person digital service team. Hopefully the company will continue to find more opportunities to improve, expand the team and build the kind of bespoke internal services that I've always enjoyed working on.
