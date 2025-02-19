'use client';

import tg from '@/assets/tg.svg';
import { useDotButton } from '@/components/EmblaCarouselDotButton';
import Pools from '@/components/Pools';
import Strategies from '@/components/Strategies';
import CONSTANTS from '@/constants';
import { useWindowSize } from '@/utils/useWindowSize';

import {
  Box,
  Center,
  Image as ChakraImage,
  Container,
  Link,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import mixpanel from 'mixpanel-browser';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function Home() {
  useEffect(() => {
    mixpanel.track('Page open');
  }, []);

  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    const tab = searchParams.get('tab');
    console.log('tab', tab);
    if (tab === 'pools') {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [searchParams]);

  const router = useRouter();

  function setRoute(value: string) {
    router.push(`?tab=${value}`);
  }

  function handleTabsChange(index: number) {
    if (index === 1) {
      setRoute('pools');
    } else {
      setRoute('strategies');
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 8000 })],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const banner_images = [
    {
      desktop: '/banners/ognft.svg',
      mobile: '/banners/ognft_small.svg',
      link: 'https://x.com/strkfarm/status/1788558092109775029',
    },
    {
      desktop: '/banners/seed_grant.svg',
      mobile: '/banners/seed_grant_small.jpg',
      link: 'https://x.com/strkfarm/status/1787783906982260881',
    },
  ];

  return (
    <Container maxWidth={'1000px'} margin={'0 auto'}>
      <Box padding={'15px 30px'} borderRadius="10px" margin={'20px 0px 10px'}>
        <Text
          fontSize={{ base: '28px', md: '35px' }}
          lineHeight={'30px'}
          marginBottom={'10px'}
          color={'cyan'}
          textAlign={'center'}
        >
          <b>{"Starknet's"} Yield Powerhouse🚀</b>
        </Text>
        <Text
          color="color2"
          textAlign={'center'}
          fontSize={{ base: '16px', md: '18px' }}
          marginBottom={'0px'}
        >
          Identify & Invest in the best $STRK rewarding pools and maximize your
          rewards
        </Text>
      </Box>

      <Box className="embla" ref={emblaRef} margin={0} width={'100%'}>
        <Box className="embla__container">
          {banner_images.map((banner, index) => (
            <Box
              className="embla__slide"
              position="relative"
              height={'auto'}
              key={index}
              padding={'10px'}
            >
              <Link href={banner.link} isExternal>
                <ChakraImage
                  src={
                    (!isMobile && size.width > 450) || size.width == 0
                      ? banner.desktop
                      : banner.mobile
                  }
                  height={'auto'}
                  boxShadow={'0px 0px 2px #484848'}
                  width="100%"
                  alt="Banner"
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              </Link>
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="grid" justifyContent="center" gap="1.2rem" mb="1.5rem">
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
          alignItems="center"
          marginRight="calc((2.6rem - 1.4rem) / 2 * -1)"
          gap=".5rem"
        >
          {scrollSnaps.map((_, index) => (
            <Box
              key={index}
              onClick={() => onDotButtonClick(index)}
              width="0.8rem"
              height="0.8rem"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              backgroundColor={index === selectedIndex ? '#4D59E8' : 'black'}
              padding="0"
              margin="0"
              border="1px solid #373A5D"
              textDecoration="none"
              appearance="none"
            />
          ))}
        </Box>
      </Box>

      <Tabs
        position="relative"
        variant="unstyled"
        width={'100%'}
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab
            color="light_grey"
            _selected={{ color: 'color2Text' }}
            onClick={() => {
              mixpanel.track('Strategies opened');
            }}
          >
            Strategies✨
          </Tab>
          <Tab
            color="light_grey"
            _selected={{ color: 'color2Text' }}
            onClick={() => {
              mixpanel.track('All pools clicked');
            }}
          >
            Find yields
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="color2Text"
          color="color1"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel bg="highlight" width={'100%'} float={'left'}>
            <Strategies></Strategies>
          </TabPanel>
          <TabPanel bg="highlight" float={'left'} width={'100%'}>
            <Pools />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <hr style={{width: '100%', borderColor: '#5f5f5f', float: 'left', margin: '20px 0'}}/> */}
      <Center padding="10px 0" width={'100%'} float={'left'}>
        <Link href={CONSTANTS.COMMUNITY_TG} isExternal>
          <ChakraImage src={tg.src} width="50" margin="0 auto" />
        </Link>
      </Center>
      <Center width={'100%'} float="left">
        <Box
          width="300px"
          maxWidth={'100%'}
          marginTop={'20px'}
          borderTop={'1px solid var(--chakra-colors-highlight)'}
          textAlign={'center'}
          textColor={'color2'}
          padding="10px 0"
          fontSize={'13px'}
        >
          Made with ❤️ on Starknet
        </Box>
      </Center>
    </Container>
  );
}
