#include <cstdint>
#include <iostream>

int main()
{
    std::int32_t s{ -1 };
    std::uint32_t u{ static_cast<std::uint32_t>(s) };

    std::cout << u << '\n';
    return 0;
}
