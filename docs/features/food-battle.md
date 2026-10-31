# Feature: Food battle

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

Two dishes face off ("কাচ্চি vs চিকেন — আজকের যুদ্ধ!"). The user votes and sees a poll bar plus a verdict: the poll agrees with them, or they're a "বিদ্রোহী" (rebel). "নতুন যুদ্ধ ⚔️" moves to the next pair.

## Why fixed numbers

Without a server there are no real votes. The prototype showed random numbers as if they were the crowd's votes. Here each pair has a fixed `pollA` in `src/data/battles.ts`, always labelled "📊 মজার জরিপ — আসল ভোট না" (fun poll, not real votes). See [0005](../decisions/0005-no-backend.md).

## Acceptance criteria

- [x] The poll label is always visible with the result
- [x] Pairs reference real dishes (data test)

## Changelog

- 2026-10-31: built
