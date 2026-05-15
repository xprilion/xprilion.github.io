# Revamping my blog with Hashnode Headless CMS

This blog has been written for the Hashnode Headless API Hackathon and the Gatsby + Hashnode Headless + Typescript is publicly available at - [https://github.com/xprilion/gatsby-hashnode-headless](https://github.com/xprilion/gatsby-hashnode-headless)

Since 2019, when I switched to a minimal content layout for my website, I dreamt of creating a lot of content on the site. However, that was not the story that unfolded after the revamp. What went wrong?

I am someone who focuses a lot on the value of the knowledge that is being offered through the content I create. What that means is - I love writing detailed blogs discussing mix of technologies. However, at the same time I love sharing my own feelings on various social topics through the blog and here lies the challenge - a blog that renders markdown files gets very tedious to maintain very quickly when you are working on different types of blogs at the same time.

I was creating a lot of markdown files on my local and would forget all about them later. I was not able to keep track of the content I was creating and could not edit this content from any device other than my laptop.

In 2023, I was came across Hashnode. I loved the simplicity of writing blogs on the platform and was amazed by the on-spot optimizations done by the team on each blog page. It was the perfect writing companion for me. Unfortunately, I had invested a good amount in my own website over the years and had a strict adherence to the absolutely minimal layout. This was tough to achieve with Hashnode, and hence, it was still not the solution to my problem.

## Introducing Hashnode Headless

In later 2023, I was introduced to an upcoming Headless mode of Hashnode. This was super exciting for me and I decided to wait. The day Hashnode headless launched, I headed over to the feature page at [https://hashnode.com/headless](https://hashnode.com/headless) and then explored the APIs at [https://gql.hashnode.com/](https://gql.hashnode.com/).
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image.png)
After a brief scouring I had realized - I had hit jackpot!

Using Hashnode headless, I could keep the extreme customization I had built along with the powerful blog creation process available on Hashnode.

A simple query could fetch my blogs safely from my Hashnode account in either HTML or Markdown format, as I needed it!

```bash
query Publication {
  publication(host: "xprilion.hashnode.dev") {
    isTeam
    title
    posts(first: 20) {
      edges {
        node {
          id
          title
          brief
          url
          tags {
            slug
          }
          coverImage {
            url
          }
        }
      }
    }
  }
}

```

There was however the challenge of fetching all my blogs from the GQL API, which was limited to 20 blogs in a go. This was easily solved by using a paginated query, with powerful support for pagination from Hashnode's GQL server.

```bash
      pageInfo {
        endCursor
        hasNextPage
      }

```

And finally, I needed to display different types of content on the blog. For this, I used tags on the blog settings to figure out what sort of layout I need to render for that blog entry. Using this, I was able to render the same markdown content as a Blog, a Codelab and a Presentation at the same time!

Here's the link to the full query - [https://github.com/xprilion/gatsby-hashnode-headless/blob/main/gatsby-node.ts](https://github.com/xprilion/gatsby-hashnode-headless/blob/main/gatsby-node.ts)
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-1.png)
Hashnode headless was solving every issue I had. However, there was a tiny problem yet to be solved.

I had to manually redeploy the repo whenever I created or edited any blog on Hashnode. This was definitely not going to fly for the amount of freedom I wanted.

## Deploy to Github Pages from Hashnode

This was unfortunately a paid feature. But...I am a developer, right? :D Yes I needed to auto-deploy from my Hashnode blog to my website. There was a simple solution.

Hashnode has an amazing feature of Webhooks. Using Webhooks, I could trigger actions on an external endpoint. However, this was as of yet not my solution. The webhooks here were in a format which doesn't work directly with Github.

What could be done?

Here's the architecture of the solution I built for this:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-2.png)
The Google Cloud Function code I wrote for this is available at - [https://github.com/xprilion/google-cloud-functions-trigger-github-action/tree/hashnode-trigger](https://github.com/xprilion/google-cloud-functions-trigger-github-action/tree/hashnode-trigger)

The Github Actions workflow file I used for this is available at - [https://github.com/xprilion/gatsby-hashnode-headless/blob/main/.github/workflows/deploy.yml](https://github.com/xprilion/gatsby-hashnode-headless/blob/main/.github/workflows/deploy.yml)

## Success

With all the setup put together - I now have an extremely customized website hosted at [https://xprilion.com](https://xprilion.com) (Also where you are reading this!) which deploys automatically from Hashnode (this blog was auto-deployed!)

I am using Listmonk for newsletter, Cusdis for comments.

And this blog is a entry for the Hashnode Headless API Hackathon! [#APIHackathon](https://hashnode.com/n/apihackathon)