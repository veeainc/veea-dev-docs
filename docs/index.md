---
title: VeeaONE Developer Platform
description: Build, deploy, and operate containerized applications and AI workloads across VeeaHubs and qualified Linux and NVIDIA Jetson runtime targets.
icon: lucide/book-open
hide:
  - toc
---

<section class="docs-home docs-home--platform">
  <header class="docs-hero docs-hero--platform">
    <div class="docs-hero__copy">
      <p class="docs-kicker">VeeaONE Developer Platform</p>
      <h1>Build and run applications and AI workloads across the Veea edge.</h1>
      <p>
        VeeaONE is a managed distributed edge application platform for deploying and operating containerized workloads across VeeaHubs and qualified runtime targets.
      </p>
      <p class="docs-hero__note">
        Developers use VHT to build, validate, and deploy containerized software to the target that fits the workload, while VeeaONE provides a common operating environment across distributed physical locations.
      </p>
      <nav class="docs-hero__actions" aria-label="Primary developer actions">
        <a class="docs-action docs-action--primary" href="vht-2.0/quickstart/" data-hover="Start building"><span>Start building</span></a>
        <a class="docs-action" href="platform/veeone-runtime/" data-hover="Understand VeeaONE Runtime"><span>Understand VeeaONE Runtime</span></a>
        <a class="docs-action" href="platform/runtime-targets/overview/" data-hover="Compare runtime targets"><span>Compare runtime targets</span></a>
      </nav>
    </div>
  <section class="docs-architecture" aria-labelledby="platform-architecture-title">
    <div class="docs-architecture__intro">
      <p class="docs-kicker">How VeeaONE works</p>
      <h2 id="platform-architecture-title">From application to managed edge operations.</h2>
      <p>VHT is the developer toolchain. VeeaONE Runtime provides the common execution layer across native and qualified edge targets.</p>
    </div>
    <div class="docs-architecture__flow">
      <article class="docs-architecture__node docs-architecture__application">
        <span class="docs-architecture__eyebrow"><i class="fa-solid fa-user-gear" aria-hidden="true"></i> Developer</span>
        <strong>Containerized application</strong>
        <small>The software and services being deployed</small>
      </article>

      <div class="docs-architecture__connector" aria-hidden="true"><span></span><i class="fa-solid fa-chevron-right"></i></div>

      <article class="docs-architecture__node docs-architecture__toolchain">
        <span class="docs-architecture__eyebrow"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> Toolchain</span>
        <strong>VHT 2.0</strong>
        <small>Build · validate · deploy</small>
      </article>

      <div class="docs-architecture__connector" aria-hidden="true"><span></span><i class="fa-solid fa-chevron-right"></i></div>

      <div class="docs-architecture__environment">
        <div class="docs-architecture__runtime">
          <span>Common execution layer</span>
          <strong>VeeaONE Runtime</strong>
        </div>
        <div class="docs-architecture__targets">
          <article>
            <span class="docs-target-logo docs-target-logo--veea"><img src="assets/brand/veea-logo-white.svg" alt="" /></span>
            <span><small>Native target</small><strong>VeeaHubs</strong></span>
          </article>
          <article>
            <span class="docs-architecture__target-logos" aria-hidden="true">
              <img src="assets/brand/runtime-targets/linux.svg" alt="" />
              <img src="assets/brand/runtime-targets/ubuntu.svg" alt="" />
              <img class="docs-architecture__target-logo--nvidia" src="assets/brand/runtime-targets/nvidia.svg" alt="" />
              <span>HW</span>
            </span>
            <span><small>Qualified runtime targets</small><strong>Linux · NVIDIA Jetson · specialized hardware</strong></span>
          </article>
        </div>
        <div class="docs-architecture__operations">
          <span>Fleet visibility and operations</span>
          <strong>Operated through VeeaONE</strong>
        </div>
      </div>
    </div>
    <p class="docs-architecture__note">
      <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
      <span>Runtime capabilities and management features vary by qualified target and deployment configuration.</span>
    </p>
  </section>
  </header>

  <section class="docs-welcome-video" aria-labelledby="welcome-video-title">
    <div class="docs-welcome-video__frame">
      <video controls preload="none" playsinline poster="assets/video/veeaone-welcome-poster02.webp.jpg" aria-label="Welcome to the VeeaONE developer platform">
        <source src="assets/video/veeaone-welcome-draft-web-02.mp4" type="video/mp4" />
        Your browser does not support HTML5 video. <a href="assets/video/veeaone-welcome-draft-web-02.mp4">Open the welcome video</a> instead.
      </video>
      <div class="docs-welcome-video__prompt" aria-hidden="true">
        <span>New to VeeaONE?</span>
        <strong><i class="fa-solid fa-circle-play"></i> Watch the platform welcome</strong>
      </div>
    </div>
    <div class="docs-welcome-video__copy">
      <p class="docs-kicker">Start with the platform</p>
      <h2 id="welcome-video-title">Welcome to the VeeaONE developer platform.</h2>
      <p>
        Get a concise introduction to VeeaONE Runtime, VeeaHubs, qualified runtime targets, and the VHT workflow for building and operating applications and AI workloads across the Veea edge.
      </p>
      <div class="docs-welcome-video__links">
        <a href="platform/veeone-runtime/">Explore VeeaONE Runtime <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        <a href="vht-2.0/quickstart/">Run the quickstart <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </section>

  <section class="docs-section docs-why">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M5 5c4 4 10 4 14 0"/><path d="M5 19c4-4 10-4 14 0"/></svg></span>
        <span>
          <p class="docs-kicker">Why VeeaONE exists</p>
          <h2>Distributed edge systems should not become distributed operational problems.</h2>
        </span>
      </div>
    </div>
    <p class="docs-runtime-note">
      Modern edge applications increasingly span distributed compute, local models, devices, network services, accelerators, and cloud-connected control. VeeaONE provides a common platform foundation for placing and operating software across that real-world edge. Depending on target capabilities and approved platform services, applications can work with local networking, device, storage, and operational interfaces.
    </p>
    <div class="docs-value-grid">
      <article>
        <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span>
        <strong>Heterogeneous compute</strong>
        <p>Place workloads across native VeeaHubs and qualified systems with the compute, storage, connectivity, or acceleration profile each part of the system requires.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5 8h14"/><path d="M5 16h14"/><path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg></span>
        <strong>Local applications and intelligence</strong>
        <p>Process operational data near its source and support local applications, inference, automation, and agent-assisted workflows where latency, bandwidth, resilience, or data locality matter.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 17a10 10 0 0 1 16 0"/><path d="M8 13a5 5 0 0 1 8 0"/><path d="M12 20h.01"/><path d="M12 9V3"/></svg></span>
        <strong>Distributed operations</strong>
        <p>Apply a common runtime and developer model across fleets of physical locations, with target enrollment, application deployment, capability validation, and operational visibility supported through VeeaONE.</p>
      </article>
    </div>
  </section>

  <section class="docs-section docs-workloads" aria-labelledby="typical-workloads-title">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg></span>
        <span>
          <p class="docs-kicker">What developers can build</p>
          <h2 id="typical-workloads-title">Typical workloads</h2>
        </span>
      </div>
    </div>
    <div class="docs-value-grid docs-value-grid--four">
      <article>
        <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></span>
        <strong>Containerized applications</strong>
        <p>Deploy standard services across qualified runtime targets.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m16 13 5 3V8l-5 3"/><rect width="13" height="12" x="3" y="6" rx="2"/></svg></span>
        <strong>Video analytics</strong>
        <p>Process camera streams and computer vision workloads locally.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg></span>
        <strong>AI inference</strong>
        <p>Run local AI inference and video analytics on qualified accelerator-backed targets, including NVIDIA Jetson-based systems validated for the deployment.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg></span>
        <strong>Operational automation</strong>
        <p>Combine local applications, events, and external AI services to automate business processes.</p>
      </article>
    </div>
  </section>

  <section class="docs-section docs-onboarding" aria-labelledby="starting-point-title">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg></span>
        <span>
          <p class="docs-kicker">Choose your starting point</p>
          <h2 id="starting-point-title">Evaluate the platform or start with an approved development environment.</h2>
        </span>
      </div>
    </div>
    <p class="docs-runtime-note">
      Public documentation is available through this portal. Production access, third-party runtime enablement, VeeaCloud services, and support depend on an approved account, supported target configuration, and applicable Veea agreement.
    </p>
    <div class="docs-primary-grid docs-primary-grid--equal">
      <section class="docs-panel docs-panel--primary">
      <div class="docs-panel__head">
        <div class="docs-heading">
          <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span>
          <span>
            <p class="docs-kicker">Evaluating VeeaONE?</p>
            <h2>Understand the platform before requesting access</h2>
          </span>
        </div>
      </div>
      <p class="docs-runtime-note">
        Explore the public documentation, understand the runtime model, and compare target options. Request developer access when you are ready to work with an approved Veea environment.
      </p>
      <div class="docs-version-links">
        <a href="platform/veeone-runtime/">
          <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span>
          <span><strong>Explore VeeaONE Runtime</strong><em>See how targets participate in the managed VeeaONE environment.</em></span>
        </a>
        <a href="platform/runtime-targets/overview/">
          <span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h7"/><path d="m16 16 2 2 4-4"/></svg></span>
          <span><strong>Compare runtime targets</strong><em>Understand the roles of VeeaHubs, Linux / Ubuntu, NVIDIA Jetson, and specialized hardware.</em></span>
        </a>
        <a href="vht-2.0/developer-onboarding/register-as-developer/">
          <span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg></span>
          <span><strong>Become a Veea developer</strong><em>Learn how approved account access, services, environments, and permissions are provided.</em></span>
        </a>
      </div>
      </section>

      <section class="docs-panel">
      <div class="docs-panel__head">
        <div class="docs-heading">
          <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"/></svg></span>
          <span>
            <p class="docs-kicker">Already have access?</p>
            <h2>Go from prerequisites to a running application</h2>
          </span>
        </div>
      </div>
      <p class="docs-runtime-note">
        Use this path when you have an approved Veea developer account, a supported and enrolled runtime target, development access, and the required local network connectivity.
      </p>
      <div class="docs-version-links">
        <a href="vht-2.0/prerequisites/">
          <span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span><strong>Confirm the prerequisites</strong><em>Check the development host, target software, enrollment, access, and network requirements.</em></span>
        </a>
        <a href="vht-2.0/quickstart/">
          <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 17.5V6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.5Z"/><path d="m8 12 2.5 2.5L16 9"/></svg></span>
          <span><strong>Run the VHT 2.0 quickstart</strong><em>Follow the current Docker-native path from development host to deployed workload.</em></span>
        </a>
        <a href="vht-2.0/deployment/compose-vs-stack/">
          <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span>
          <span><strong>Choose a deployment workflow</strong><em>Compare Docker Compose and Docker Stack for the application you are deploying.</em></span>
        </a>
      </div>
      </section>
    </div>
  </section>

  <section class="docs-section docs-runtime">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span>
        <span>
          <p class="docs-kicker">VeeaONE Runtime targets</p>
          <h2>VeeaHubs are the native edge target. Qualified nodes extend the runtime.</h2>
        </span>
      </div>
    </div>
    <div class="docs-link-grid docs-link-grid--targets">
      <a href="platform/runtime-targets/veeahubs/"><span class="docs-icon docs-icon--blue docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0z"/></svg></span><strong>VeeaHubs</strong><span>Native Veea edge hardware with the full managed runtime profile.</span></a>
      <a href="platform/runtime-targets/linux-ubuntu/"><span class="docs-icon docs-icon--teal docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 640 512"><path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg></span><strong>Linux / Ubuntu</strong><span>General-purpose edge compute for local services, storage-heavy workloads, application hosting, and site-adjacent processing.</span></a>
      <a href="platform/runtime-targets/nvidia-jetson/"><span class="docs-icon docs-icon--purple docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 512 512"><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg></span><strong>NVIDIA Jetson</strong><span>Accelerator-backed edge compute for qualified local inference, video analytics, and AI-enabled containerized workloads.</span></a>
      <a href="platform/runtime-targets/other-hardware/"><span class="docs-icon docs-icon--gold docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 576 512"><path d="M64 32C46.3 32 32 46.3 32 64V304v48 80c0 26.5 21.5 48 48 48H496c26.5 0 48-21.5 48-48V304 152.2c0-18.2-19.4-29.7-35.4-21.1L352 215.4V152.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4V64c0-17.7-14.3-32-32-32H64z"/></svg></span><strong>Other hardware</strong><span>Add specialized edge systems for storage, device access, industrial connectivity, acceleration, or location-specific compute.</span></a>
      <a href="platform/runtime-targets/runtime-capabilities/"><span class="docs-icon docs-icon--red docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg></span><strong>Capability profiles</strong><span>Describe what each target contributes: compute, storage, networking, acceleration, and device access.</span></a>
    </div>
    <p class="docs-runtime-note">
      Runtime capabilities vary by target. VeeaHubs provide the full native runtime profile. Qualified nodes should be validated for OS, networking, storage, accelerators, and hardware-specific services before deployment.
    </p>
  </section>

  <section class="docs-section docs-decision">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"/></svg></span>
        <span>
          <p class="docs-kicker">Choose the right path</p>
          <h2>Which VHT workflow should I use?</h2>
        </span>
      </div>
    </div>
    <p class="docs-runtime-note">
      Use the VHT 2.0 workflow unless you are maintaining an existing application that was built with the VHT 1.x workflow and are unable to migrate it to VHT 2.0 at this time.
    </p>
    <div class="docs-decision-table">
      <div><strong>New application development</strong><span>Use VHT 2.0</span></div>
      <div><strong>Docker-native app development with registries and Compose</strong><span>Use VHT 2.0</span></div>
      <div><strong>Docker Context, Compose, or Stack deployment workflows</strong><span>Use VHT 2.0</span></div>
      <div><strong>Existing signed app, .tgz package, or Control Center upload</strong><span>Maintain with VHT 1.x until you can migrate</span></div>
      <div><strong>Current VHC25 apps or legacy D-Bus integration</strong><span>Maintain with VHT 1.x until you can migrate</span></div>
      <div><strong>Existing VHT 1.x apps alongside new development</strong><span>New work on VHT 2.0; existing apps stay on VHT 1.x</span></div>
      <div><strong>Production rollout decision</strong><span>Confirm the target workflow with Veea</span></div>
    </div>
  </section>

  <section class="docs-section docs-why" hidden data-search-exclude>
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></span>
        <span>
          <p class="docs-kicker">Public docs, official access</p>
          <h2>Read the docs today. Sign up when you are ready to build on Veea.</h2>
        </span>
      </div>
    </div>
    <div class="docs-value-grid">
      <article>
        <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span>
        <strong>Explore publicly</strong>
        <p>Use the documentation to understand the platform, compare VHT 1.x and 2.0, and plan your edge application.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg></span>
        <strong>Become a developer</strong>
        <p>Register for the account access, developer services, environments, and permissions needed to work with Veea systems.</p>
      </article>
      <article>
        <span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg></span>
        <strong>Deploy with confidence</strong>
        <p>Build on the Docker-native VHT 2.0 workflow, and keep existing VHT 1.x signed apps running while you plan their migration.</p>
      </article>
    </div>
  </section>

  <div class="docs-primary-grid" hidden data-search-exclude>
    <section class="docs-panel docs-panel--primary">
      <div class="docs-panel__head">
        <div class="docs-heading">
          <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"/></svg></span>
          <span>
            <p class="docs-kicker">Start here</p>
            <h2>Get from account to deployed app</h2>
          </span>
        </div>
        <span class="docs-panel__meta">5 steps</span>
      </div>
      <ol class="docs-task-list">
        <li>
          <a href="vht-2.0/developer-onboarding/create-veea-account/">
            <span class="docs-icon docs-icon--blue docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></span>
            <span><strong>Create your developer account</strong><em>Set up access so you can work with Veea developer tooling.</em></span>
            <small>Account</small>
          </a>
        </li>
        <li>
          <a href="platform/prepare-runtime-target/">
            <span class="docs-icon docs-icon--teal docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 640 512"><path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z"/></svg></span>
            <span><strong>Prepare and enroll a runtime target</strong><em>Choose the target, install the runtime, register, enroll, and confirm its capability profile.</em></span>
            <small>Runtime</small>
          </a>
        </li>
        <li>
          <a href="vht-2.0/install/install-vht/">
            <span class="docs-icon docs-icon--purple docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 512 512"><path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg></span>
            <span><strong>Install the toolkit</strong><em>Install VHT 2.0 on the Ubuntu development host.</em></span>
            <small>Tools</small>
          </a>
        </li>
        <li>
          <a href="vht-2.0/quickstart/">
            <span class="docs-icon docs-icon--green docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 512 512"><path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg></span>
            <span><strong>Run the first app</strong><em>Build and run a containerized workload on VeeaONE edge infrastructure.</em></span>
            <small>Build</small>
          </a>
        </li>
        <li>
          <a href="vht-2.0/deployment/compose-vs-stack/">
            <span class="docs-icon docs-icon--gold docs-icon--fa" aria-hidden="true"><svg viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg></span>
            <span><strong>Choose a deployment path</strong><em>Deploy with Docker Compose or Docker Stack using VHT 2.0.</em></span>
            <small>Deploy</small>
          </a>
        </li>
      </ol>
    </section>

    <section class="docs-panel">
      <div class="docs-panel__head">
        <div class="docs-heading">
          <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg></span>
          <span>
            <p class="docs-kicker">Choose your path</p>
            <h2>VHT documentation</h2>
          </span>
        </div>
      </div>
      <div class="docs-version-links">
        <a href="vht-2.0/overview/">
          <span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 17.5V6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.5Z"/><path d="m8 12 2.5 2.5L16 9"/></svg></span>
          <span><strong>VHT 2.0</strong><em>The default Docker-native workflow for new development, with <code>vhc2</code>.</em></span>
        </a>
        <a href="vht-1.0/overview/">
          <span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 6v12"/><path d="M17.2 9 12 6 6.8 9"/><path d="M17.2 15 12 18l-5.2-3"/><path d="m6.8 9 5.2 3 5.2-3"/></svg></span>
          <span><strong>VHT 1.x</strong><em>Maintenance path for existing <code>vhc</code> apps: signing, Control Center UI links, and hub runtime integration.</em></span>
        </a>
      </div>
    </section>
  </div>

  <section class="docs-section">
    <div class="docs-section__head">
      <div class="docs-heading">
        <span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span>
        <span>
          <p class="docs-kicker">Build with VeeaONE</p>
          <h2>Common developer jobs</h2>
        </span>
      </div>
    </div>
    <div class="docs-link-grid">
      <a href="vht-2.0/quickstart/"><span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"/></svg></span><strong>Run a VHT 2.0 quickstart</strong><span>Create a Docker-native app path from a clean Ubuntu host.</span></a>
      <a href="vht-2.0/hubs/add-show-ping-remove/"><span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="18" height="8" x="3" y="3" rx="2"/><rect width="18" height="8" x="3" y="13" rx="2"/><path d="M7 7h.01"/><path d="M7 17h.01"/></svg></span><strong>Manage development hubs</strong><span>Add, inspect, ping, and remove VeeaHub or VeeaHub Mesh targets.</span></a>
      <a href="platform/prepare-runtime-target/"><span class="docs-icon docs-icon--teal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h7"/><path d="m16 16 2 2 4-4"/></svg></span><strong>Bring targets online</strong><span>Choose placement, register, enroll, and describe the capabilities each target adds.</span></a>
      <a href="platform/runtime-targets/overview/"><span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M8 6v12"/><path d="M16 6v12"/></svg></span><strong>Choose a runtime target</strong><span>Compare VeeaHubs, Linux / Ubuntu, NVIDIA Jetson, and other qualified edge nodes.</span></a>
      <a href="vht-2.0/registries/overview/"><span class="docs-icon docs-icon--purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/></svg></span><strong>Publish images</strong><span>Use registries to move application images into the VeeaONE edge environment.</span></a>
      <a href="vht-2.0/validation-plans/overview/"><span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span><strong>Run upgrade checks</strong><span>Compare existing VHT 1.x apps with VHT 2.0 and hub upgrade behavior.</span></a>
      <a href="vht-1.0/quickstart/"><span class="docs-icon docs-icon--blue" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 9h.01"/><path d="M7 15h10"/><path d="M11 9h6"/></svg></span><strong>Maintain a VHT 1.x app</strong><span>Use <code>vhc</code>, signed apps, and sideload workflows for existing applications.</span></a>
      <a href="vht-1.0/control-center-ui-links/"><span class="docs-icon docs-icon--green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span><strong>Add app UI links</strong><span>Expose local app UIs through Control Center and ReverseProxy.</span></a>
      <a href="vht-1.0/api-reference/io-veea-veeahub-info/"><span class="docs-icon docs-icon--gold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 12h.01"/><path d="M12 16v-4"/><circle cx="12" cy="12" r="10"/></svg></span><strong>Inspect hub runtime details</strong><span>Read identity, model, mesh, network, and runtime information through VHT 1.x integration points.</span></a>
    </div>
  </section>

</section>
