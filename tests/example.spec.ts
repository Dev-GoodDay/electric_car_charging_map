import { expect, test } from '@playwright/test'

// NOTE:
// React 19 + Next App Router issue:
// Playwright click() does not trigger navigation.
// Using dispatchEvent as a workaround.

test.describe('@critical 라우팅 테스트', () => {
  test('충전소 검색 페이지 이동', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('http://localhost:3000/')
    // 텍스트가 충전소 검색인 버튼 찾아서 클릭
    await page.getByText('충전소 검색').dispatchEvent('click')
    await page.waitForURL('**/station')
    // 새로운 URL이 'station'인지 확인
    await expect(page).toHaveURL('http://localhost:3000/station')
  })

  test('즐겨찾기 페이지 이동', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('http://localhost:3000/')
    // 텍스트가 즐겨찾기인 버튼 찾아서 클릭
    await page.getByText('즐겨찾기').dispatchEvent('click')
    await page.waitForURL('**/favorite')
    // 새로운 URL이 'favorite'인지 확인
    await expect(page).toHaveURL('http://localhost:3000/favorite')
  })
})
