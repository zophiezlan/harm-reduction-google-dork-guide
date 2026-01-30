# Contributing to the Harm Reduction Google Dork Guide

Thank you for your interest in improving this resource! Contributions from the harm reduction
community help keep this guide relevant, accurate, and useful.

---

## Ways to Contribute

### 1. Report Broken Dorks

Google changes its algorithms regularly. If a dork no longer works:

1. [Open an issue](../../issues/new?template=bug_report.md) with the broken query
2. Include what you expected vs. what happened
3. Note when it last worked (if known)

### 2. Suggest New Dorks

Have a useful search pattern? Share it:

1. Test your dork thoroughly first
2. [Open an issue](../../issues/new?template=new_dork_pack.md) or submit a PR
3. Include context on why it's useful for harm reduction work

### 3. Improve Documentation

- Fix typos or unclear explanations
- Add cross-references between related content
- Improve accessibility (alt text, semantic structure)
- Update outdated information

### 4. Create New Dork Packs

For underserved topics or populations:

1. Follow the existing pack structure (see any file in `docs/dork-packs/`)
2. Include 5-15 tested, working dorks
3. Add context explaining each dork's purpose
4. Reference the [Style Guide](STYLE_GUIDE.md)

---

## Style Guide

Please follow our [Documentation Style Guide](STYLE_GUIDE.md) for:

- GitHub Alert syntax (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`)
- Code block formatting (use `txt` for dorks)
- Table structure and alignment
- Header hierarchy and navigation patterns
- Accessibility considerations

### Quick Style Checklist

- [ ] Use `txt` language hint for dork code blocks (not `bash`)
- [ ] Include live search links after queries where helpful
- [ ] Use GitHub Alerts for callouts (not manual `> **Note:**`)
- [ ] Follow proper heading hierarchy (H1 → H2 → H3)
- [ ] Add cross-references to related content

---

## Pull Request Process

### Before Submitting

1. **Read the Style Guide** - Consistency matters
2. **Test your dorks** - Ensure they return useful results
3. **Check for duplicates** - Search existing packs for similar queries
4. **Consider ethics** - Ensure queries align with harm reduction values

### PR Checklist

When you submit a PR, please confirm:

- [ ] Dorks have been tested and work as described
- [ ] Content follows the [Style Guide](STYLE_GUIDE.md)
- [ ] No personal, identifiable, or sensitive information is exposed
- [ ] Changes support legitimate harm reduction purposes
- [ ] Cross-references to related content are included where relevant

### Review Process

1. Submit your PR with a clear description
2. Maintainers will review for accuracy and style
3. Address any feedback
4. Once approved, your contribution will be merged

---

## Dork Submission Format

When contributing new dorks, use this structure:

````markdown
### Descriptive Name

```txt
site:example.com "search terms" filetype:pdf
```

**What this finds:** Brief explanation of what results to expect.

**Why it's useful:** Context for harm reduction workers.
````

Note: Code blocks with dork queries automatically get an "Instant Dork" button that opens Google
search in a new tab.

---

## Content Guidelines

### Do Include

- Searches that find **publicly available** information
- Dorks that support **legitimate harm reduction work**
- Queries focused on **de-identified, aggregate data**
- Searches for **official documents, policies, and guidance**
- Resources that **respect and center lived experience**

### Do NOT Include

- Searches designed to find personal or identifiable information
- Queries that could facilitate harm to individuals
- Dorks targeting private or leaked data
- Content that stigmatizes people who use drugs
- Anything that violates the [Code of Conduct](CODE_OF_CONDUCT.md)

---

## Getting Help

- **Questions about contributing?** Open a discussion or issue
- **Not sure if a dork is appropriate?** Ask first—we're happy to help
- **Need guidance on style?** Reference the [Style Guide](STYLE_GUIDE.md)

---

## Recognition

All contributors are appreciated! Significant contributions will be acknowledged in release notes.

---

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md). We're committed to
maintaining a respectful, inclusive community centered on harm reduction values.

---

_Thank you for helping improve resources for the harm reduction community!_
