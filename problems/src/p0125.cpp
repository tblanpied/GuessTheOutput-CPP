#include <climits>
#include <iostream>

int main()
{
    std::cout << (CHAR_BIT >= 8) << ' '
              << (sizeof(short) * CHAR_BIT >= 16) << ' '
              << (sizeof(long long) * CHAR_BIT >= 64) << '\n';
    return 0;
}
