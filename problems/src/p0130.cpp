#include <cstdint>
#include <iostream>

int main()
{
    std::int32_t x{ 2'147'483'647 };
    std::cout << x << '\n';

    x = x + 1;
    std::cout << x << '\n';

    return 0;
}
