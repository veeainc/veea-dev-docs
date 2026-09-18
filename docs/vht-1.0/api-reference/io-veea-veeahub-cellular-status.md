---
icon: lucide/file-text
---

# io.veea.VeeaHub.Cellular.Status

## Name

io.veea.VeeaHub.Cellular.Status

`Provides methods to obtain status and statistics for the cellular interface`

## Methods

```text
JSON          (OUT s         status);
TRProviders   (OUT a{sa{ss}} providers);
TR181JSON     (OUT s         status);
TR181TESTJSON (OUT s         status);
CacheTime     (OUT i         status,
               OUT a{ss}     cached_at);
CacheAge      (OUT i         status,
               OUT a{ss}     cache_age);
Statistics    (OUT i         status,
               OUT a{si}     stats_info);
Call          (OUT i         status,
               OUT a{ss}     call_info);
Module        (OUT i         status,
               OUT a{ss}     module_info);
Sims          (OUT i         status,
               OUT aa{ss}    sim_info);
SimProfiles   (OUT i         status,
               OUT aa{ss}    profile_info);
Cells         (OUT i         status,
               OUT aa{ss}    cell_info);
CellLocation  (OUT i         status,
               OUT aa{ss}    cell_loc_info);
Carriers      (OUT i         status,
               OUT aa{ss}    carrier_info);
```

## Description

## Method Details

### The JSON() method

```text
JSON (OUT s status);
```

**Allow**: context=default

`OUT s status`:

### The TRProviders() method

```text
TRProviders (OUT a{sa{ss}} providers);
```

**Allow**: context=default

`OUT a{sa{ss}} providers`:

### The TR181JSON() method

```text
TR181JSON (OUT s status);
```

**Allow**: context=default

`OUT s status`:

### The TR181TESTJSON() method

```text
TR181TESTJSON (OUT s status);
```

**Allow**: context=default

`OUT s status`:

### The CacheTime() method

```text
CacheTime (OUT i     status,
           OUT a{ss} cached_at);
```

**Allow**: context=default

`OUT i status`:

`OUT a{ss} cached_at`:

### The CacheAge() method

```text
CacheAge (OUT i     status,
          OUT a{ss} cache_age);
```

**Allow**: context=default

`OUT i status`:

`OUT a{ss} cache_age`:

### The Statistics() method

```text
Statistics (OUT i     status,
            OUT a{si} stats_info);
```

**Allow**: context=default

`OUT i status`:

`OUT a{si} stats_info`:

### The Call() method

```text
Call (OUT i     status,
      OUT a{ss} call_info);
```

**Allow**: context=default

`OUT i status`:

`OUT a{ss} call_info`:

### The Module() method

```text
Module (OUT i     status,
        OUT a{ss} module_info);
```

**Allow**: context=default

`OUT i status`:

`OUT a{ss} module_info`:

### The Sims() method

```text
Sims (OUT i      status,
      OUT aa{ss} sim_info);
```

**Allow**: context=default

`OUT i status`:

`OUT aa{ss} sim_info`:

### The SimProfiles() method

```text
SimProfiles (OUT i      status,
             OUT aa{ss} profile_info);
```

**Allow**: context=default

`OUT i status`:

`OUT aa{ss} profile_info`:

### The Cells() method

```text
Cells (OUT i      status,
       OUT aa{ss} cell_info);
```

**Allow**: context=default

`OUT i status`:

`OUT aa{ss} cell_info`:

### The CellLocation() method

```text
CellLocation (OUT i      status,
              OUT aa{ss} cell_loc_info);
```

**Allow**: context=default

`OUT i status`:

`OUT aa{ss} cell_loc_info`:

### The Carriers() method

```text
Carriers (OUT i      status,
          OUT aa{ss} carrier_info);
```

**Allow**: context=default

`OUT i status`:

`OUT aa{ss} carrier_info`:
