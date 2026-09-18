---
icon: lucide/file-text
---

# io.veea.VeeaHub.Licenses

## Name

io.veea.VeeaHub.Licenses

## Methods

```text
GetFeature          (IN  s     name,
                     OUT i     errno,
                     OUT s     json_parameters);
GetMatchingFeatures (IN  s     match,
                     OUT a(ss) features);
```

## Description

This allows the client to determine the licenses on the VeeaHub.

## Method Details

### The GetFeature() method

```text
GetFeature (IN  s name,
            OUT i errno,
            OUT s json_parameters);
```

This returns the a status indicating if the indicated feature is licensed or not along with any license parameters as a JSON string. If errno is zero, the feature is licensed. If status is non-zero, the feature is not licensed.

**Allow**: context=default

`IN s name`:

The feature name

`OUT i errno`:

The return code (0 for success, non-zero for failure)

`OUT s json_parameters`:

The JSON license parameters

### The GetMatchingFeatures() method

```text
GetMatchingFeatures (IN  s     match,
                     OUT a(ss) features);
```

This allows multiple features to be returned with a glob style wildcard match. The response is an array of name and parameter tuples. Only valid licensed features will be returned.

**Allow**: context=default

`IN s match`:

The match criteria

`OUT a(ss) features`:

The matching license features
